import { useTheme, Tooltip, IconButton } from "@mui/material";
import useThemeMode from "../../theme/useThemeMode";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function ThemeButton() {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  return (
    <Tooltip
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: theme.palette.text.primary,
          height: "fit-content",
        }}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}
