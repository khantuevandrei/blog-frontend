import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        color: theme.palette.text.primary,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Typography variant="body2">
        Blog API for Authors. For demonstration purposes only.
      </Typography>
    </Box>
  );
}
