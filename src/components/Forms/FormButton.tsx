import { useTheme, Button, CircularProgress } from "@mui/material";

interface FormButtonProps {
  name: string;
  disabled: boolean;
}

export default function FormButton({ name, disabled }: FormButtonProps) {
  const theme = useTheme();

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      fullWidth
      sx={{
        mt: 2,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        textTransform: "none",
        fontWeight: 500,
        fontSize: 16,
        height: 38,
        "&:hover": { bgcolor: theme.palette.primary.light },
        transition: "background 0.3s",
      }}
    >
      {disabled ? <CircularProgress size={25} color="inherit" /> : name}
    </Button>
  );
}
