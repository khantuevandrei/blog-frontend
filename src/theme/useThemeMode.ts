import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export default function useThemeMode() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return context;
}
