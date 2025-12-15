import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Button,
  Divider,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { Link } from "react-router";
import type { Post } from "../../types/Post";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import AlertMessage from "../../components/General/AlertMessage";
import ConfirmDialog from "../General/ConfirmDialog";

interface MyPostCardProps {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

export default function MyPostCard({ post, setPosts }: MyPostCardProps) {
  const { token } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ publish: boolean; delete: boolean }>(
    {
      publish: false,
      delete: false,
    }
  );
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  // Toggle publish
  async function handlePublish() {
    setLoading((prev) => ({ ...prev, publish: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${post.id}/publish`,
        {
          method: "PATCH",
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

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
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
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${post.id}`,
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

      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: 3,
        transition: "0.2s",
        bgcolor: "background.paper",
        "&:hover": { boxShadow: 6, bgcolor: "background.highlight" },
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "65ch",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {post.title}
        </Typography>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            justifyContent: "space-between",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            Created: {new Date(post.created_at).toLocaleDateString()}
          </Typography>
          <Chip
            size="small"
            label={post.published ? "Published" : "Draft"}
            color={post.published ? "success" : "default"}
            variant="outlined"
          />
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: "text.primary",
          }}
        >
          {post.body}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ color: "text.secondary" }}
        >
          <ChatBubbleOutline fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">{post.total_comments}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            to={`/posts/${post.id}`}
            size="small"
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            View
          </Button>
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
        </Stack>
      </CardActions>
      <AlertMessage type="error" message={error} />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Post"
        text="Are you sure you want to delete your post? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Card>
  );
}
