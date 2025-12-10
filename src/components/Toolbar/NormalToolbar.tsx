import { useAuth } from "../../hooks/useAuth";
import { Box, Button, useTheme } from "@mui/material";
import { Link } from "react-router";
import ThemeButton from "./ThemeButton";

export default function NormalToolbar() {
  const theme = useTheme();
  const { user, logout } = useAuth();

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
            to="/posts"
            variant="text"
            size="medium"
            sx={{ color: theme.palette.text.primary }}
          >
            View posts
          </Button>
          {user && (
            <>
              <Button
                component={Link}
                to="/myposts"
                variant="text"
                size="medium"
                sx={{ color: theme.palette.text.primary }}
              >
                My posts
              </Button>
              <Button
                component={Link}
                to="/profile"
                variant="text"
                size="medium"
                sx={{ color: theme.palette.text.primary }}
              >
                Profile
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
          <Button
            onClick={logout}
            variant="contained"
            size="medium"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              component={Link}
              to="/login"
              variant="text"
              size="medium"
              sx={{ color: theme.palette.text.primary }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="medium"
              sx={{ color: theme.palette.primary.contrastText }}
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
