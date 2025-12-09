import { Box, Typography, useTheme } from "@mui/material";
import DefaultButton from "../../components/general/DefaultButton";
import { useNavigate } from "react-router";

export default function Error({ code = 404, message = "Page not found" }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: 100,
          fontWeight: 600,
          color: theme.palette.text.primary,
        }}
      >
        {code}
      </Typography>
      <Typography
        variant="h5"
        sx={{ mb: 3, color: theme.palette.text.primary }}
      >
        {message}
      </Typography>
      <Box>
        <DefaultButton name="Home" onClick={() => navigate("/")} />
      </Box>
    </Box>
  );
}
