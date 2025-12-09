import { useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderLinkType {
  title: string;
  nav: string;
}

export default function HeaderLink({ title, nav }: HeaderLinkType) {
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
