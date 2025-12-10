import { Typography, useTheme } from "@mui/material";

interface MetaLineProps {
  label: string;
  value?: string | null;
}

export default function MetaLine({ label, value }: MetaLineProps) {
  const theme = useTheme();

  return (
    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
      {label}{" "}
      {value
        ? new Date(value).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : ""}
    </Typography>
  );
}
