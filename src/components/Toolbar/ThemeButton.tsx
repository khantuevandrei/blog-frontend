import { IconButton } from "@mui/material";
import useThemeMode from "../../hooks/useThemeMode";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function ThemeButton() {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme}>
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
