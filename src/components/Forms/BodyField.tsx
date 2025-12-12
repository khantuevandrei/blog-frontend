import { TextField } from "@mui/material";

interface BodyFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function BodyField({ value, onChange }: BodyFieldProps) {
  return (
    <TextField
      label="Body"
      name="body"
      margin="dense"
      value={value}
      onChange={onChange}
      fullWidth
      multiline
      rows={8}
      required
      sx={{
        "& .MuiInputBase-root": {
          fontSize: 14,
          paddingRight: "8px",
        },
        "& .MuiInputLabel-root": {
          fontSize: 14,
        },
      }}
    />
  );
}
