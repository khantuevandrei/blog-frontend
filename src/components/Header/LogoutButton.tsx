import { Button, useTheme } from "@mui/material";
import { useAuth } from "../../auth/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();
  const theme = useTheme();

  return (
    <Button
      onClick={logout}
      sx={{
        color: theme.palette.text.primary,
        fontSize: 20,
      }}
    >
      Logout
    </Button>
  );
}
