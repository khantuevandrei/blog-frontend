import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";
import { Link } from "react-router";
import type { Post } from "../../types/Post";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
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
        height: "100%",
        width: "100%",
        maxWidth: 560,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {post.title}
        </Typography>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{ justifyContent: "space-between", color: "text.secondary" }}
        >
          <Typography variant="body2">by {post.author.username}</Typography>
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

        <Divider sx={{ my: 1.5 }} />

        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: { xs: 4, md: 5 },
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

        <Button
          component={Link}
          to={`/posts/${post.id}`}
          variant="contained"
          size="small"
          sx={{ textTransform: "none", fontWeight: 500 }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
