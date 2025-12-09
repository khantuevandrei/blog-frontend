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

interface UsernameChecklistProps {
  username: string;
  validations: Record<string, boolean>;
}

export default function UsernameChecklist({
  username,
  validations,
}: UsernameChecklistProps) {
  const theme = useTheme();

  const items = [
    { label: "3-20 characters", key: "length" },
    { label: "Only letters, numbers, underscore", key: "validChars" },
  ];

  return (
    <Collapse in={Boolean(username)} timeout={300}>
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
