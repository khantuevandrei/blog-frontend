import { useTheme, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function UserButton() {
  const { user } = useAuth();
  const theme = useTheme();

  if (!user) return null;

  return (
    <Typography
      variant="body1"
      sx={{
        fontSize: 20,
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
      }}
    >
      Hello,&nbsp;{" "}
      <MuiLink
        component={Link}
        to="/me"
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 600,
        }}
      >
        {user.username}
      </MuiLink>
    </Typography>
  );
}
