import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import Error from "../Error/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import PostsPreviewHeader from "../../components/Posts/PostsPreviewHeader";
import PostsPreviewList from "../../components/Posts/PostsPreviewList";
import LinkButton from "../../components/General/LinkButton";
import AlertMessage from "../../components/General/AlertMessage";

export default function MyPosts() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      if (!user) return;

      setLoading(true);

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}/posts`,
          {
            method: "GET",
            headers: { Authorization: `bearer ${token}` },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Error fetching posts");
          return;
        }

        setPosts(data);
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [user, token]);

  if (!user) {
    return <Error code={401} message="Not logged in" />;
  }

  if (loading) return <LoadingOverlay />;

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 6,
      }}
    >
      <PostsPreviewHeader />
      <PostsPreviewList posts={posts} />
      <LinkButton name="New post" to="/posts/new" />
      <AlertMessage type="error" message={error}></AlertMessage>
    </Box>
  );
}
