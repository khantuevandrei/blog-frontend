import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "../../types/Post";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import PostCard from "../../components/Posts/PostCard";
import AlertMessage from "../../components/General/AlertMessage";

export default function AllPosts() {
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
      setLoading((prev) => ({ ...prev, page: true }));
      setError(null);

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/posts`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to load posts");
          return;
        }

        const data: Post[] = await response.json();

        setPosts(data);

        if (data.length < 10) {
          setHasMore(false);
        }

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
  }, []);

  // Load next posts
  const loadMore = useCallback(async () => {
    if (loading.posts || !hasMore) return;

    setLoading((prev) => ({ ...prev, posts: true }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts?offset=${offset}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
  }, [loading.posts, hasMore, offset]);

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

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          color: "text.primary",
          textTransform: "uppercase",
          mt: 4,
          textAlign: "center",
        }}
      >
        All Posts
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{
          my: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2,1fr)" },
          gridAutoRows: "300px",
        }}
      >
        {posts.map((post) => (
          <Box key={post.id}>
            <PostCard post={post} />
          </Box>
        ))}
      </Grid>
      <Box ref={loaderRef} sx={{ height: "50px" }} />
      {loading.posts && (
        <CircularProgress sx={{ display: "block", mx: "auto", mb: 4 }} />
      )}
      <AlertMessage type="error" message={error} />
    </Box>
  );
}
