import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    gradient?: string;
    highlight?: string;
    overlay?: string;
  }
}
