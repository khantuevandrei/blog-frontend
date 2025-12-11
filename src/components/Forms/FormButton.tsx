import { Button, CircularProgress } from "@mui/material";

interface FormButtonProps {
  name: string;
  disabled: boolean;
}

export default function FormButton({ name, disabled }: FormButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      fullWidth
      sx={{
        bgcolor: "primary.main",
        "&:hover": {
          bgcolor: "primary.dark",
        },
        mt: 2,
      }}
    >
      {disabled ? <CircularProgress size={25} color="inherit" /> : name}
    </Button>
  );
}
