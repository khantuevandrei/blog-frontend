import { useState } from "react";
import { Box, Button, TextField, CircularProgress, Paper } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import type { Comment } from "../../types/Post";

interface CreateCommentProps {
  postId: number;
  onSuccess: (comment: Comment) => void;
}

export default function CreateComment({
  postId,
  onSuccess,
}: CreateCommentProps) {
  const { token } = useAuth();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ body }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create comment");
        return;
      }

      setBody("");
      onSuccess(data); // return new comment to parent
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mt: 3,
        maxWidth: "75ch",
        width: "100%",
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          multiline
          minRows={3}
          fullWidth
          placeholder="Write a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 1,
          }}
        >
          {error && (
            <Box sx={{ color: "error.main", fontSize: 14 }}>{error}</Box>
          )}

          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={loading || !body.trim()}
            sx={{ textTransform: "none" }}
          >
            {loading ? <CircularProgress size={22} /> : "Post comment"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
