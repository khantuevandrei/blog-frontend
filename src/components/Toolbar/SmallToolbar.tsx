import {
  Box,
  Drawer,
  MenuItem,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import { Menu, CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from "react-router";
import ThemeButton from "./ThemeButton";

export default function SmallToolbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  function getLinkStyle(path: string) {
    const isActive = location.pathname === path;
    return {
      color: "text.primary",
      bgcolor: isActive ? "action.selected" : "transparent",
      width: "fit-content",
    };
  }

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
          <MenuItem component={Link} to="/all" sx={getLinkStyle("/all")}>
            View posts
          </MenuItem>
          {user && (
            <>
              <MenuItem component={Link} to="/my" sx={getLinkStyle("/my")}>
                My posts
              </MenuItem>
              <MenuItem
                component={Link}
                to="/create"
                sx={getLinkStyle("/create")}
              >
                Create post
              </MenuItem>
              <MenuItem
                component={Link}
                to="/profile"
                sx={getLinkStyle("/profile")}
              >
                Profile
              </MenuItem>
            </>
          )}
          <Divider sx={{ my: 3 }} />
          {user ? (
            <MenuItem>
              <Button onClick={logout} variant="contained" fullWidth>
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
                  sx={{ color: "text.primary" }}
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
