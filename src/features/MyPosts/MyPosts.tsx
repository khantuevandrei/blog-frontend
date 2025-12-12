import { useEffect, useState, useRef, useCallback } from "react";
import { Typography, Stack, Box, CircularProgress } from "@mui/material";
import MyPostCard from "../../components/Posts/MyPostCard";
import { useAuth } from "../../hooks/useAuth";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import AlertMessage from "../../components/General/AlertMessage";
import type { Post } from "../../types/Post";

export default function MyPosts() {
  const { user, token } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ page: boolean; posts: boolean }>({
    page: false,
    posts: false,
  });

  // Posts state for pagination
  const [posts, setPosts] = useState<Post[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const loaderRef = useRef(null);

  // Load first posts on page load
  useEffect(() => {
    async function getPosts() {
      if (!user) return;

      setLoading((prev) => ({ ...prev, page: true }));

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}/posts`,
          {
            method: "GET",
            headers: { Authorization: `bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to load posts");
          return;
        }

        const data: Post[] = await response.json();

        setPosts(data);

        setHasMore(data.length === 10);
        setOffset(data.length === 10 ? 10 : 0);

        if (data.length === 10) {
          setHasMore(true);
          setOffset(10);
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, page: false }));
      }
    }

    getPosts();
  }, [user, token]);

  // Load next posts
  const loadMore = useCallback(async () => {
    if (!user) return;

    if (loading.posts || !hasMore) return;

    setLoading((prev) => ({ ...prev, posts: true }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}/posts?offset=${offset}`,
        {
          method: "GET",
          headers: { Authorization: `bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to load posts");
        return;
      }

      const data: Post[] = await response.json();

      setPosts((prev) => [...prev, ...data]);

      if (data.length < 10) {
        setHasMore(false);
      } else {
        setOffset((prev) => prev + 10);
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, posts: false }));
    }
  }, [user, token, loading.posts, hasMore, offset]);

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

  if (posts.length === 0)
    return (
      <Typography variant="h5" fontWeight={600} gutterBottom>
        No posts
      </Typography>
    );

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          color: "text.primary",
          textTransform: "uppercase",
          mt: 4,
        }}
      >
        My Posts
      </Typography>
      <Stack
        spacing={4}
        my={4}
        sx={{
          alignItems: "center",
          flexGrow: 1,
          width: "100%",
        }}
      >
        {posts.map((post) => (
          <MyPostCard key={post.id} post={post} setPosts={setPosts} />
        ))}
      </Stack>
      <Box ref={loaderRef} sx={{ height: "50px" }} />
      {loading.posts && (
        <CircularProgress sx={{ display: "block", mx: "auto", mb: 8 }} />
      )}
      <AlertMessage type="error" message={error} />
    </Box>
  );
}
