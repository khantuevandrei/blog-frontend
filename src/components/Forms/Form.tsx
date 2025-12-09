import { Paper, Typography, Box, useTheme } from "@mui/material";
import type { ReactNode } from "react";

interface FormProps {
  width?: number;
  name: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export default function Form({ width, name, onSubmit, children }: FormProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        width: "100%",
        py: 4,
        [theme.breakpoints.down("sm")]: {
          py: 2,
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: { width },
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          position: "relative",
        }}
      >
        <Typography variant="h5" pb={2} sx={{ fontWeight: 500 }}>
          {name}
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
