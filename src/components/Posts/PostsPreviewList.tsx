import { List, Box, Typography, useTheme } from "@mui/material";
import type { Post } from "../../types/Post";
import PostPreviewCard from "./PostPreviewCard";

interface PostsPreviewListProps {
  posts: Post[];
}

export default function PostsPreviewList({ posts }: PostsPreviewListProps) {
  const theme = useTheme();

  if (!posts?.length) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          display: "block",
          textDecoration: "none",
          color: theme.palette.text.primary,
          mb: 2,
          p: 2,
        }}
      >
        <Typography>No posts found</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%", maxWidth: 600 }}>
      {posts.map((post) => (
        <PostPreviewCard key={post.id} post={post} />
      ))}
    </List>
  );
}
