import { ArrowBack } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { Link } from "react-router";

export default function BackButton({ nav }: { nav: string }) {
  const theme = useTheme();

  return (
    <IconButton
      component={Link}
      to={nav}
      sx={{
        position: "absolute",
        top: -60,
        left: 0,
        [theme.breakpoints.up("sm")]: { top: 0, left: -60 },
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: 40,
        "&:hover": {
          bgcolor: theme.palette.primary.light,
        },
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        borderRadius: 100,
        p: 1.5,
      }}
    >
      <ArrowBack sx={{ fontSize: 20 }} />
    </IconButton>
  );
}
