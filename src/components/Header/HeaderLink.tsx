import { useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderLinkProps {
  title: string;
  nav: string;
}

export default function HeaderLink({ title, nav }: HeaderLinkProps) {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={nav}
      sx={{
        color: theme.palette.text.primary,
        fontSize: 20,
      }}
    >
      {title}
    </Button>
  );
}
