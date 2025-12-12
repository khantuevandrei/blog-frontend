import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import AlertMessage from "../../components/General/AlertMessage";
import ConfirmDialog from "../../components/General/ConfirmDialog";
import LinkButton from "../../components/General/LinkButton";
import DefaultButton from "../../components/General/DefaultButton";
import LoadingOverlay from "../../components/General/LoadingOverlay";

export interface userInfoProps {
  id: number;
  username: string;
  role: string;
  created_at: string;
  post_count: number;
}

export default function Profile() {
  const { user, token, logout } = useAuth();
  const [userInfo, setUserInfo] = useState<userInfoProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<{ profile: boolean; delete: boolean }>(
    {
      profile: true,
      delete: false,
    }
  );
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  // Fetch user by id
  useEffect(() => {
    async function getUserInfo() {
      if (!user) {
        setError("Not logged in");
        return;
      }

      setLoading((prev) => ({ ...prev, profile: true }));
      setError(null);

      try {
        const response = await fetch(
          `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message);
          return;
        }

        setUserInfo(data);
      } catch {
        setError("Network error");
      } finally {
        setLoading((prev) => ({ ...prev, profile: false }));
      }
    }

    getUserInfo();
  }, [user]);

  // Open dialog
  function openConfirm() {
    setConfirmOpen(true);
  }

  // Delete profile
  async function handleDelete() {
    setConfirmOpen(false);

    if (!user) {
      setError("Not logged in");
      return;
    }

    setLoading((prev) => ({ ...prev, delete: true }));
    setError(null);

    try {
      const response = await fetch(
        `https://blog-backend-production-16f8.up.railway.app/api/users/${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      logout();
    } catch {
      setError("Network error");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  }

  if (loading.profile) return <LoadingOverlay />;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!userInfo ? (
        <Typography>No user data</Typography>
      ) : (
        <Box sx={{ flexGrow: 1, maxWidth: 400 }}>
          <Card
            sx={{
              width: "100%",
              mx: "auto",
              p: 2,
              borderRadius: 1,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight={500} textAlign="center">
                Profile
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={500}>Username:</Typography>
                  <Typography>{userInfo.username}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={500}>Role:</Typography>
                  <Typography>{userInfo.role}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={500}>Total Posts:</Typography>
                  <Typography>{userInfo.post_count}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={500}>Created:</Typography>
                  <Typography>
                    {new Date(userInfo.created_at).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Stack>
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={1.5}>
                <LinkButton
                  name="Update username"
                  to="/username"
                  variant="outlined"
                />
                <LinkButton
                  name="Update password"
                  to="/password"
                  variant="outlined"
                />
                <DefaultButton
                  name="Delete profile"
                  onClick={openConfirm}
                  disabled={loading.delete}
                />
              </Stack>
            </CardContent>
            {error && <AlertMessage type={"error"} message={error} />}
          </Card>
        </Box>
      )}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Profile"
        text="Are you sure you want to delete your profile? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
