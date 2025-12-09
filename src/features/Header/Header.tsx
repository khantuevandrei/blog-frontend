import { Box, useTheme } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import HeaderLogo from "../../components/Header/HeaderLogo";
import ThemeButton from "../../components/Header/ThemeButton";
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
        px: 2,
        py: 1,
        bgcolor: theme.palette.background.paper,
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "1fr 1fr",
        },
      }}
    >
      <HeaderLogo />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
          [theme.breakpoints.down("sm")]: {
            gridColumn: "1/3",
          },
        }}
      >
        <HeaderLink title="View posts" nav="/posts/all" />
        {user && <HeaderLink title="My posts" nav="/posts/my" />}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          columnGap: 1,
          [theme.breakpoints.down("sm")]: {
            gridRow: "1/2",
            gridColumn: "2/3",
          },
        }}
      >
        <ThemeButton />
        {user ? (
          <>
            <HeaderLink title={user.username} nav="/posts/all" />
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
