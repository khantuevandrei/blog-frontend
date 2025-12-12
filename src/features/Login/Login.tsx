import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import Form from "../../components/Forms/Form";
import TextField from "../../components/Forms/TextField";
import PasswordField from "../../components/Forms/PasswordField";
import FormButton from "../../components/Forms/FormButton";
import AlertMessage from "../../components/General/AlertMessage";
import AuthInfo from "../../components/Auth/AuthInfo";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://blog-backend-production-16f8.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token to localStorage
      login(data.token, data.user);

      navigate("/");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={400} name="Login" onSubmit={handleSubmit}>
      <TextField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <PasswordField
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <AlertMessage type="error" message={error} />
      <FormButton name="Login" disabled={loading} />
      <AuthInfo desc="Dont'have an account?" link="Register" nav="/register" />
    </Form>
  );
}
