import { TextField as Field } from "@mui/material";

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  label,
  name,
  value,
  onChange,
  required = true,
}: TextFieldProps) {
  return (
    <Field
      label={label}
      name={name}
      fullWidth
      margin="dense"
      value={value}
      onChange={onChange}
      required={required}
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
      }}
      FormHelperTextProps={{
        style: { color: "text.secondary" },
      }}
    />
  );
}
