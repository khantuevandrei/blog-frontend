import Form from "../../components/Forms/Form";
import TextField from "../../components/Forms/TextField";
import FormButton from "../../components/Forms/FormButton";
import BackButton from "../../components/General/BackButton";
import AlertMessage from "../../components/General/AlertMessage";
import UsernameChecklist from "../../components/Auth/UsernameChecklist";
import { validateUsername } from "../../utils/validations";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function UpdateUsername() {
  const { user, token, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{ username: string }>({ username: "" });

  const usernameValidations = validateUsername(form.username);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ username: e.target.value.trim() });
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
    if (Object.values(usernameValidations).some((v) => !v)) {
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
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setForm({ username: "" });

      setSuccess("Username updated");

      login(token, data);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={400} name="Update username" onSubmit={handleSubmit}>
      <BackButton />
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
        type={error ? "error" : "success"}
        message={error ? error : success}
      />
      <FormButton name="Update" disabled={loading} />
    </Form>
  );
}
