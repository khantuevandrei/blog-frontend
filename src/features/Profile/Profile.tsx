import Form from "../../components/Forms/Form";
import TextField from "../../components/Forms/TextField";
import PasswordField from "../../components/Forms/PasswordField";
import FormButton from "../../components/Forms/FormButton";
import BackButton from "../../components/General/BackButton";
import AlertMessage from "../../components/General/AlertMessage";
import UsernameChecklist from "../../components/Auth/UsernameChecklist";
import PasswordChecklist from "../../components/Auth/PasswordChecklist";
import { validateUsername, validatePassword } from "../../utils/validations";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useTheme, Box } from "@mui/material";
import type { ChangeEvent, FormEvent } from "react";

export default function Profile() {
  const theme = useTheme();
  const { user, token, login } = useAuth();
  const [error, setError] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  });
  const [success, setSuccess] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  });
  const [loading, setLoading] = useState<{
    username: boolean;
    password: boolean;
  }>({
    username: false,
    password: false,
  });
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const usernameValidations = validateUsername(form.username);
  const passwordValidations = validatePassword(
    form.password,
    form.confirmPassword
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmitUsername(e: FormEvent) {
    e.preventDefault();

    // Safeguard against null values
    if (!user) {
      setError((prev) => ({ ...prev, username: "Not logged in" }));
      return;
    }

    if (!token) {
      setError((prev) => ({ ...prev, username: "Token is missing" }));
      return;
    }

    // Validation errors are present
    if (Object.values(usernameValidations).some((v) => !v)) {
      setError((prev) => ({
        ...prev,
        username: "Please fix validation errors",
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, username: true }));
    setError((prev) => ({ ...prev, username: null }));
    setSuccess((prev) => ({ ...prev, username: null }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ username: form.username }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError((prev) => ({ ...prev, username: data.message }));
        return;
      }

      setForm((prev) => ({ ...prev, username: "" }));

      setSuccess((prev) => ({ ...prev, username: "Username updated" }));

      login(token, data);
    } catch {
      setError((prev) => ({ ...prev, username: "Network error" }));
    } finally {
      setLoading((prev) => ({ ...prev, username: false }));
    }
  }

  async function handleSubmitPassword(e: FormEvent) {
    e.preventDefault();

    // Safeguard against null values
    if (!user) {
      setError((prev) => ({ ...prev, username: "Not logged in" }));
      return;
    }

    if (!token) {
      setError((prev) => ({ ...prev, username: "Token is missing" }));
      return;
    }

    // Validation errors are present
    if (Object.values(passwordValidations).some((v) => !v)) {
      setError((prev) => ({
        ...prev,
        password: "Please fix validation errors",
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, password: true }));
    setError((prev) => ({ ...prev, password: null }));
    setSuccess((prev) => ({ ...prev, password: null }));

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ password: form.password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError((prev) => ({ ...prev, password: data.message }));
        return;
      }

      setForm((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      setSuccess((prev) => ({ ...prev, password: "Password updated" }));
    } catch {
      setError((prev) => ({ ...prev, password: "Network error" }));
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        flexGrow: 1,
        width: "100%",
        [theme.breakpoints.down("sm")]: {
          pt: 6,
        },
      }}
    >
      <Form width={400} name="Update username" onSubmit={handleSubmitUsername}>
        <BackButton nav={"/"} />
        <TextField
          label="New username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <UsernameChecklist
          username={form.username}
          validations={usernameValidations}
        />
        <AlertMessage
          type={error.username ? "error" : "success"}
          message={error.username ? error.username : success.username}
        />
        <FormButton name="Update" disabled={loading.username} />
      </Form>

      <Form width={400} name="Update password" onSubmit={handleSubmitPassword}>
        <PasswordField
          label="New password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <PasswordField
          label="Confirm new password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <PasswordChecklist
          pass={form.password}
          confirmPass={form.confirmPassword}
          validations={passwordValidations}
        />
        <AlertMessage
          type={error.password ? "error" : "success"}
          message={error.password ? error.password : success.password}
        />
        <FormButton name="Update" disabled={loading.password} />
      </Form>
    </Box>
  );
}
