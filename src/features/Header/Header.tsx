import { Box, useTheme } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import HeaderLogo from "../../components/Header/HeaderLogo";
import ThemeButton from "../../components/Header/ThemeButton";
import UserButton from "../../components/Header/UserButton";
import LogoutButton from "../../components/Header/LogoutButton";
import HeaderLink from "../../components/Header/HeaderLink";

export default function Header() {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Box
      component="header"
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        width: "100%",
        mx: "auto",
        p: 1,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <HeaderLogo />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <HeaderLink title="All posts" nav="/posts/all" />
        {user && <HeaderLink title="My posts" nav="/posts/my" />}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <ThemeButton />
        {user ? (
          <>
            <UserButton />
            <LogoutButton />
          </>
        ) : (
          <>
            <HeaderLink title="Login" nav="/login" />
            <HeaderLink title="Register" nav="/register" />
          </>
        )}
      </Box>
    </Box>
  );
}
