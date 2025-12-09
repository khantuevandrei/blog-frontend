import { Outlet } from "react-router";
import { Box, Container, useTheme } from "@mui/material";
import Header from "./features/Header/Header";
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
      <Header />
      <Container
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
