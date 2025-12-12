import { useAuth } from "../../hooks/useAuth";
import Form from "../../components/Forms/Form";
import TextField from "../../components/Forms/TextField";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import FormButton from "../../components/Forms/FormButton";
import AlertMessage from "../../components/General/AlertMessage";
import BodyField from "../../components/Forms/BodyField";
import type { Post } from "../../types/Post";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import BackButton from "../../components/General/BackButton";

export default function EditPost() {
  const { postId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>();
  const [form, setForm] = useState<{ title: string; body: string }>({
    title: "",
    body: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ page: boolean; update: boolean }>({
    page: false,
    update: false,
  });

  useEffect(() => {
    async function getPost() {
      setLoading((prev) => ({ ...prev, page: true }));

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to load post");
          return;
        }

        const data: Post = await response.json();

        setPost(data);
        setForm({ title: data.title, body: data.body });
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, page: false }));
      }
    }

    getPost();
  }, [postId, token]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }));
  }

  async function handleSubmit(e: FormEvent) {
    if (!post) return;

    e.preventDefault();
    setError(null);
    setLoading((prev) => ({ ...prev, update: true }));

    if (!form.title || !form.body) {
      setError("Both title and body are required");
      return;
    }

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/posts/${postId}`,
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

      navigate(`/posts/${postId}`);
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  }

  if (loading.page) return <LoadingOverlay />;

  return (
    <Form width={600} name="Edit post" onSubmit={handleSubmit}>
      <BackButton nav={`/posts/${postId}`} />
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <BodyField value={form.body} onChange={handleChange} />
      <AlertMessage type="error" message={error} />
      <FormButton name="Update" disabled={loading.update} />
    </Form>
  );
}
