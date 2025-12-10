import { useTheme, Typography, ListItem } from "@mui/material";
import { Link } from "react-router";
import type { Post } from "../../types/Post";
import MetaLine from "./MetaLine";

interface PostPreviewCardProps {
  post: Post;
}

export default function PostPreviewCard({ post }: PostPreviewCardProps) {
  const theme = useTheme();

  return (
    <ListItem
      component={Link}
      to={`/${post.id}`}
      key={post.id}
      sx={{
        display: "block",
        mb: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: theme.palette.background.paper,
        boxShadow: 1,
        "&:hover": {
          boxShadow: 4,
          bgcolor: theme.palette.background.default,
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 600,
          mb: 2,
        }}
      >
        {post.title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: theme.palette.text.primary,
          mb: 1,
        }}
      >
        {post.body}
      </Typography>

      <MetaLine label="Created" value={post.created_at} />

      <MetaLine label="Updated" value={post.updated_at} />

      <MetaLine
        label={post.published ? "Published" : "Not published"}
        value={post.published_at}
      />

      <MetaLine label={`Comments: ${post.total_comments}`} />
    </ListItem>
  );
}
