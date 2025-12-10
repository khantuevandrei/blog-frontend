import { Box, CircularProgress, useTheme } from "@mui/material";

export default function LoadingOverlay() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: theme.palette.background.overlay,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color:
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
        }}
      />
    </Box>
  );
}
