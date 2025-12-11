import { Button, CircularProgress } from "@mui/material";

interface DefaultButtonTypes {
  name: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function DefaultButton({
  name,
  disabled,
  onClick,
}: DefaultButtonTypes) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        mt: 2,
      }}
    >
      {disabled ? <CircularProgress size={25} color="inherit" /> : name}
    </Button>
  );
}
