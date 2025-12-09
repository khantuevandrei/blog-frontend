import {
  useTheme,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ProgressBar from "./ProgressBar";

interface PasswordChecklistProps {
  pass: string;
  confirmPass: string;
  validations: Record<string, boolean>;
}

export default function PasswordChecklist({
  pass,
  confirmPass,
  validations,
}: PasswordChecklistProps) {
  const theme = useTheme();

  const items = [
    { label: "At least 8 characters", key: "length" },
    { label: "Lowercase letter", key: "lowercase" },
    { label: "Uppercase letter", key: "uppercase" },
    { label: "Number", key: "number" },
    { label: "Symbol", key: "symbol" },
    { label: "Passwords match", key: "passwordsMatch" },
  ];

  return (
    <Collapse in={Boolean(pass) || Boolean(confirmPass)} timeout={300}>
      <ProgressBar validations={validations} />
      <List dense sx={{ mt: 1 }}>
        {items.map((item) => (
          <ListItem key={item.key}>
            <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
              {validations[item.key] ? (
                <CheckCircle
                  sx={(theme) => ({
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.success.light
                        : theme.palette.success.dark,
                  })}
                />
              ) : (
                <Cancel
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.error.light
                        : theme.palette.error.dark,
                  }}
                />
              )}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
}
