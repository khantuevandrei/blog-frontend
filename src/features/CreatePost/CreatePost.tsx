import { useAuth } from "../../hooks/useAuth";
import Form from "../../components/Forms/Form";
import TextField from "../../components/Forms/TextField";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FormButton from "../../components/Forms/FormButton";
import AlertMessage from "../../components/General/AlertMessage";
import BodyField from "../../components/Forms/BodyField";

export default function CreatePost() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://blog-backend-production-16f8.up.railway.app/api/posts",
        {
          method: "POST",
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

      navigate(`/${data.id}`);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form width={600} name="Create post" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <BodyField value={form.body} onChange={handleChange} />
      <AlertMessage type="error" message={error} />
      <FormButton name="Create" disabled={loading} />
    </Form>
  );
}
