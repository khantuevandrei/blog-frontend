import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  name: string;
  to: string;
}

export default function LinkButton({ name, to }: LinkButtonProps) {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={to}
      variant="contained"
      sx={{
        mt: 2,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        textTransform: "none",
        fontWeight: 500,
        fontSize: 16,
        maxHeight: 38,
        "&:hover": { bgcolor: theme.palette.primary.light },
        transition: "background 0.3s",
        flexGrow: 1,
      }}
    >
      {name}
    </Button>
  );
}
