import { Box, Typography, Stack, Avatar, Paper } from "@mui/material";
import type { Comment } from "../../types/Post";

interface CommentsProps {
  comments: Comment[];
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <Box
      sx={{
        maxWidth: "75ch",
        mx: "auto",
        mt: 4,
        width: "100%",
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Comments
      </Typography>

      <Stack spacing={2}>
        {comments.map((comment) => (
          <Paper
            key={comment.id}
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: "background.paper",
              boxShadow: 1,
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              <Avatar sx={{ width: 26, height: 26 }}>
                {comment.author.username[0].toUpperCase()}
              </Avatar>

              <Typography variant="body2" fontWeight={500}>
                {comment.author.username}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {new Date(comment.created_at).toLocaleDateString()}
              </Typography>
            </Stack>

            <Typography variant="body2" color="text.primary">
              {comment.body}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
