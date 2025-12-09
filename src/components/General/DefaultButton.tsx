import { Button, CircularProgress, useTheme } from "@mui/material";

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
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={onClick}
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
        flexGrow: 1,
      }}
    >
      {disabled ? <CircularProgress size={25} color="inherit" /> : name}
    </Button>
  );
}
