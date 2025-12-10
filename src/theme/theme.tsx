import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1e40af",
      light: "#3b82f6",
      dark: "#173494ff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f472b6",
      light: "#f9a8d4",
      dark: "#be185d",
      contrastText: "#fff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#b91c1c",
      contrastText: "#fff",
    },
    success: {
      main: "#22c55e",
      light: "#4ade80",
      dark: "#15803d",
      contrastText: "#fff",
    },
    info: {
      main: "#0ea5e9",
      light: "#38bdf8",
      dark: "#0369a1",
      contrastText: "#fff",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
      gradient: `
        radial-gradient(circle at 20% 25%, #6091faff, transparent 80%),
        radial-gradient(circle at 60% 70%, #f88ec8ff, transparent 80%)
      `,
      overlay: "rgba(255,255,255,0.1)",
    },
    text: {
      primary: "#111827",
      secondary: "#374151",
    },
  },
  typography: {
    fontFamily: "'Poppins', Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 500 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#60a5fa",
      light: "#93c5fd",
      dark: "#3b82f6",
      contrastText: "#0b0f19",
    },
    secondary: {
      main: "#f9a8d4",
      light: "#fbcfe8",
      dark: "#db2777",
      contrastText: "#000",
    },
    error: {
      main: "#f87171",
      light: "#fca5a5",
      dark: "#b91c1c",
      contrastText: "#000",
    },
    success: {
      main: "#4ade80",
      light: "#86efac",
      dark: "#15803d",
      contrastText: "#000",
    },
    info: {
      main: "#38bdf8",
      light: "#7dd3fc",
      dark: "#0369a1",
      contrastText: "#000",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
      gradient: `
        radial-gradient(circle at 20% 25%, rgba(96,165,250,0.25), transparent 80%),
        radial-gradient(circle at 65% 75%, rgba(249,168,212,0.22), transparent 80%)
      `,
      overlay: "rgba(0,0,0,0.3)",
    },
    text: {
      primary: "#f9fafb",
      secondary: "#d1d5db",
    },
  },
  typography: {
    fontFamily: "'Poppins', Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 500 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
