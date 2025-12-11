import { TextField, IconButton, InputAdornment } from "@mui/material";
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

  function toggleShow() {
    setShow((prev) => !prev);
  }

  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      name={name}
      fullWidth
      margin="dense"
      value={value}
      onChange={onChange}
      required
      variant="outlined"
      sx={{
        width: "100%",
        "& .MuiInputBase-root": {
          height: 48,
          fontSize: 14,
          paddingRight: "8px",
        },
        "& .MuiInputLabel-root": {
          fontSize: 14,
        },
      }}
      InputLabelProps={{
        style: { color: "text.secondary" },
      }}
      InputProps={{
        style: {
          color: "text.primary",
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
        style: { color: "text.secondary" },
      }}
    />
  );
}
