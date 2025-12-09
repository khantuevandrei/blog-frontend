import { useTheme, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface AuthInfoProps {
  desc: string;
  link: string;
  nav: string;
}

export default function AuthInfo({ desc, link, nav }: AuthInfoProps) {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        mt: 2,
        textAlign: "center",
        color: theme.palette.text.secondary,
        fontSize: 14,
      }}
    >
      {desc}{" "}
      <Typography
        component={Link}
        to={nav}
        sx={{
          color: theme.palette.primary.main,
          textDecoration: "none",
          fontWeight: 600,
          "&:hover": {
            color: theme.palette.primary.light,
          },
        }}
      >
        {link}
      </Typography>
    </Typography>
  );
}
