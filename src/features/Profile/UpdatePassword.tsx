import Form from "../../components/Forms/Form";
import PasswordField from "../../components/Forms/PasswordField";
import FormButton from "../../components/Forms/FormButton";
import BackButton from "../../components/General/BackButton";
import AlertMessage from "../../components/General/AlertMessage";
import PasswordChecklist from "../../components/Auth/PasswordChecklist";
import { validatePassword } from "../../utils/validations";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function UpdatePassword() {
  const { user, token, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const passwordValidations = validatePassword(
    form.password,
    form.confirmPassword
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Safeguard against null values
    if (!user) {
      setError("Not logged in");
      return;
    }

    if (!token) {
      setError("Token is missing");
      return;
    }

    // Validation errors are present
    if (Object.values(passwordValidations).some((v) => !v)) {
      setError("Please fix validation errors");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

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
        setError(data.message);
        return;
      }

      setForm((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      setSuccess("Password updated");

      login(token, data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={400} name="Update password" onSubmit={handleSubmit}>
      <BackButton nav={"/profile"} />
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
        type={error ? "error" : "success"}
        message={error ? error : success}
      />
      <FormButton name="Update" disabled={loading} />
    </Form>
  );
}
