import { useTheme, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeaderLogo() {
  const theme = useTheme();

  return (
    <Typography
      variant="h4"
      component={Link}
      to="/"
      sx={{
        color: theme.palette.text.primary,
        textDecoration: "none",
        fontWeight: 700,
      }}
    >
      Blog API
    </Typography>
  );
}
