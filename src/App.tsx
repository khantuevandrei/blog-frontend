import { Suspense } from "react";
import { Outlet } from "react-router";
import { Box, Container, useTheme } from "@mui/material";
import LoadingOverlay from "./components/General/LoadingOverlay";
import Toolbar from "./features/Toolbar/Toolbar";
import Footer from "./features/Footer/Footer";

function App() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: theme.palette.background.gradient,
      }}
    >
      <Toolbar />
      <Suspense fallback={<LoadingOverlay />}>
        <Container
          component="main"
          sx={{
            display: "flex",
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Container>
      </Suspense>
      <Footer />
    </Box>
  );
}

export default App;
