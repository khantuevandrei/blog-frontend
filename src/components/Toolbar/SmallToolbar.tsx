import {
  Box,
  Drawer,
  MenuItem,
  Divider,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import { Menu, CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import ThemeButton from "./ThemeButton";

export default function SmallToolbar() {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(!open);
  }

  return (
    <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
      <ThemeButton />
      <IconButton onClick={toggleDrawer}>
        <Menu />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={toggleDrawer}>
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <CloseRounded />
            </IconButton>
          </Box>
          <MenuItem component={Link} to="/all">
            View posts
          </MenuItem>
          {user && (
            <>
              <MenuItem component={Link} to="/my">
                My posts
              </MenuItem>
              <MenuItem component={Link} to="/profile">
                Profile
              </MenuItem>
            </>
          )}
          <Divider sx={{ my: 3 }} />
          {user ? (
            <MenuItem>
              <Button
                onClick={logout}
                variant="contained"
                fullWidth
                sx={{ color: theme.palette.primary.contrastText }}
              >
                Logout
              </Button>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  fullWidth
                  sx={{ color: theme.palette.text.primary }}
                >
                  Login
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  fullWidth
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  Register
                </Button>
              </MenuItem>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
