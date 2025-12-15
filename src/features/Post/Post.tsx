import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Divider,
  Chip,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import type { Post, Comment } from "../../types/Post";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import Error from "../Error/Error";
import Comments from "../../components/Posts/Comments";
import AlertMessage from "../../components/General/AlertMessage";
import BackButton from "../../components/General/BackButton";
import ConfirmDialog from "../../components/General/ConfirmDialog";
import CreateComment from "../../components/Posts/CreateComment";

export default function Post() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { postId } = useParams();

  const [post, setPost] = useState<Post>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{
    page: boolean;
    publish: boolean;
    delete: boolean;
    comments: boolean;
  }>({
    page: true,
    publish: false,
    delete: false,
    comments: false,
  });
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  // Comments state for pagination
  const [comments, setComments] = useState<Comment[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const loaderRef = useRef(null);

  // Fetch post
  useEffect(() => {
    async function getPost() {
      setError(null);
      setLoading((prev) => ({ ...prev, page: true }));

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to load posts");
          return;
        }

        const data = await response.json();

        setPost(data);
        setComments(data.comments);

        setHasMore(data.comments.length === 5);
        setOffset(data.comments.length === 5 ? 5 : 0);
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, page: false }));
      }
    }

    getPost();
  }, [postId, token]);

  // Toggle publish
  async function handlePublish() {
    setLoading((prev) => ({ ...prev, publish: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}/publish`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to load posts");
        return;
      }

      const data = await response.json();

      setPost(data);
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, publish: false }));
    }
  }

  // Open dialog
  function openConfirm() {
    setConfirmOpen(true);
  }

  // Delete post
  async function handleDelete() {
    setConfirmOpen(false);

    if (!post) {
      setError("Post not found");
      return;
    }

    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      navigate("/my");
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  // Load next comments
  const loadMore = useCallback(async () => {
    if (loading.comments || !hasMore) return;

    setLoading((prev) => ({ ...prev, comments: true }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}/comments?offset=${offset}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to load comments");
        return;
      }

      const data = await response.json();

      setComments((prev) => [...prev, ...data.comments]);

      if (data.comments.length < 5) {
        setHasMore(false);
      } else {
        setOffset((prev) => prev + 5);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, comments: false }));
    }
  }, [postId, loading.comments, hasMore, offset]);

  // Detect when user reaches the end of the page
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0 }
    );

    const element = loaderRef.current;

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [loadMore]);

  if (loading.page) return <LoadingOverlay />;
  if (!post) return <Error />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        my: 4,
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
          position: "relative",
          mt: { xs: 6 },
          maxWidth: "75ch",
          width: "100%",
        }}
      >
        <BackButton />

        <Card
          sx={{
            width: "100%",
            maxWidth: "75ch",
            height: "100%",
            borderRadius: 1,
            boxShadow: 3,
            bgcolor: "background.paper",
            transition: "0.2s",
            position: "relative",
          }}
        >
          <CardContent>
            {/* Title */}
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {post.title}
            </Typography>

            {/* Meta */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                color: "text.secondary",
                flexWrap: "wrap",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ width: 28, height: 28 }}>
                    {post.author.username[0].toUpperCase()}
                  </Avatar>
                  <Typography variant="body2">
                    {post.author.username}
                  </Typography>
                </Stack>
                <Typography variant="body2">
                  {new Date(post.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Stack>

              <Chip
                size="small"
                label={post.published ? "Published" : "Draft"}
                color={post.published ? "success" : "default"}
                variant="outlined"
              />
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Body */}
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.7,
                color: "text.primary",
              }}
            >
              {post.body}
            </Typography>
          </CardContent>
          {/* Footer */}
          <CardActions
            sx={{
              px: 2,
              pb: 2,
              justifyContent: "space-between",
              color: "text.secondary",
            }}
          >
            <Box display="flex" alignItems="center">
              <ChatBubbleOutline fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{post.total_comments}</Typography>
            </Box>
            {/* Post controls if user is author */}
            {user?.username === post.author.username && (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  component={Link}
                  to={`/posts/${post.id}/edit`}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={handlePublish}
                  size="small"
                  variant="outlined"
                  disabled={loading.publish}
                  sx={{ textTransform: "none" }}
                >
                  {loading.publish ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : post.published ? (
                    "Unpublish"
                  ) : (
                    "Publish"
                  )}
                </Button>
                <Button
                  onClick={openConfirm}
                  size="small"
                  variant="contained"
                  disabled={loading.delete}
                  sx={{ textTransform: "none" }}
                >
                  {loading.delete ? (
                    <CircularProgress size={25} color="inherit" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </Box>
            )}
          </CardActions>
          <AlertMessage type="error" message={error} />
        </Card>
      </Box>
      {user && (
        <CreateComment
          postId={post.id}
          onSuccess={(newComment) => {
            setComments((prev) => [newComment, ...prev]);
            setPost((prev) =>
              prev ? { ...prev, total_comments: prev.total_comments + 1 } : prev
            );
          }}
        />
      )}

      {post.total_comments > 0 && <Comments comments={comments} />}
      <Box ref={loaderRef} sx={{ height: "50px" }} />
      {loading.comments && (
        <CircularProgress sx={{ display: "block", mx: "auto", mb: 8 }} />
      )}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Post"
        text="Are you sure you want to delete your post? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
