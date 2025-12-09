import { TextField as Field, useTheme } from "@mui/material";

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
  const theme = useTheme();

  return (
    <Field
      label={label}
      name={name}
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      required={required}
      variant="outlined"
      InputLabelProps={{
        style: { color: theme.palette.text.secondary },
      }}
      InputProps={{
        style: {
          color: theme.palette.text.primary,
        },
      }}
      FormHelperTextProps={{
        style: { color: theme.palette.text.secondary },
      }}
    />
  );
}
