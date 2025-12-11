import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  name: string;
  to: string;
  variant?: ButtonProps["variant"];
}

export default function LinkButton({
  name,
  to,
  variant = "contained",
}: LinkButtonProps) {
  return (
    <Button
      component={Link}
      to={to}
      variant={variant}
      sx={{
        mt: 2,
      }}
    >
      {name}
    </Button>
  );
}
