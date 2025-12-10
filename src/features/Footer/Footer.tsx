import { Box, Typography, useTheme, alpha } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        backdropFilter: "blur(24px)",
        backgroundColor: alpha(theme.palette.background.default, 0.4),
        py: 1,
      }}
    >
      <Typography variant="body2">
        Blog API. For demonstration purposes only.
      </Typography>
    </Box>
  );
}
