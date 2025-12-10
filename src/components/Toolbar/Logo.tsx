import { useTheme, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Logo() {
  const theme = useTheme();

  return (
    <Typography
      variant="h5"
      component={Link}
      to="/"
      sx={{
        color: theme.palette.text.primary,
        textDecoration: "none",
        fontWeight: 700,
        mr: 2,
      }}
    >
      Blog API
    </Typography>
  );
}
