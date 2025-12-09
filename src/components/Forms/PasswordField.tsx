import { TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordField({
  label,
  name,
  value,
  onChange,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const theme = useTheme();

  function toggleShow() {
    setShow((prev) => !prev);
  }

  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      name={name}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required
      variant="outlined"
      InputLabelProps={{
        style: { color: theme.palette.text.secondary },
      }}
      InputProps={{
        style: {
          color: theme.palette.text.primary,
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShow} edge="end">
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      FormHelperTextProps={{
        style: { color: theme.palette.text.secondary },
      }}
    />
  );
}
