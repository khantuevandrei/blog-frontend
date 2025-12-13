import { useAuth } from "../../hooks/useAuth";
import { Box, Button, Stack, Avatar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import ThemeButton from "./ThemeButton";

export default function NormalToolbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  function getLinkStyle(path: string) {
    const isActive = location.pathname === path;
    return {
      color: "text.primary",
      bgcolor: isActive ? "action.selected" : "transparent",
      "&:hover": { bgcolor: "action.hover" },
    };
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          px: 0,
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex", gap: 2 } }}>
          <Button
            component={Link}
            to="/"
            variant="text"
            size="medium"
            sx={getLinkStyle("/")}
          >
            View posts
          </Button>
          {user && (
            <>
              <Button
                component={Link}
                to="/my"
                variant="text"
                size="medium"
                sx={getLinkStyle("/my")}
              >
                My posts
              </Button>
              <Button
                component={Link}
                to="/create"
                variant="text"
                size="medium"
                sx={getLinkStyle("/create")}
              >
                Create post
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 1,
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <Stack
              component={Link}
              to="/profile"
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "none",
                },
                mx: 1,
              }}
            >
              <Avatar sx={{ width: 28, height: 28 }}>
                {user.username[0].toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight={500}>
                {user.username}
              </Typography>
            </Stack>
            <Button onClick={logout} variant="contained" size="medium">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant="text"
              size="medium"
              sx={{ color: "text.primary" }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="medium"
            >
              Register
            </Button>
          </>
        )}

        <ThemeButton />
      </Box>
    </>
  );
}
