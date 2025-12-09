import { useTheme, Collapse, Alert } from "@mui/material";

type AlertSeverity = "error" | "success" | "warning" | "info";

interface AlertMessageType {
  type: AlertSeverity;
  message: string | null;
}

export default function AlertMessage({ type, message }: AlertMessageType) {
  const theme = useTheme();

  if (!message) return null;

  return (
    <Collapse in={Boolean(message)} timeout={300}>
      <Alert
        severity={type}
        sx={{
          mt: 1,
          bgcolor: theme.palette[type].light,
          color: theme.palette[type].contrastText,
          fontSize: 14,
        }}
      >
        {message}
      </Alert>
    </Collapse>
  );
}
