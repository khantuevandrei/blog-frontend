import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface AuthInfoProps {
  desc: string;
  link: string;
  nav: string;
}

export default function AuthInfo({ desc, link, nav }: AuthInfoProps) {
  return (
    <Typography
      sx={{
        mt: 2,
        textAlign: "center",
        color: "text.secondary",
        fontSize: 14,
      }}
    >
      {desc}{" "}
      <Typography
        component={Link}
        to={nav}
        sx={{
          color: "primary.main",
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": {
            color: "primary.dark",
          },
        }}
      >
        {link}
      </Typography>
    </Typography>
  );
}
