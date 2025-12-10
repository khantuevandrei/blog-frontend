import {
  AppBar,
  Box,
  Toolbar as MuiToolbar,
  Container,
  alpha,
  useTheme,
} from "@mui/material";
import Logo from "../../components/Toolbar/Logo";
import NormalToolbar from "../../components/Toolbar/NormalToolbar";
import SmallToolbar from "../../components/Toolbar/SmallToolbar";

export default function Toolbar() {
  const theme = useTheme();

  return (
    <>
      {/* Spacer to adjust for fixed toolbar */}
      <Box sx={{ height: { xs: 74, md: 90 } }} />
      {/* Toolbar */}
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <MuiToolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: 1,
              backdropFilter: "blur(24px)",
              border: "1px solid",
              borderColor: theme.palette.divider,
              backgroundColor: alpha(theme.palette.background.default, 0.4),
              boxShadow: 1,
              p: "8px 12px",
            }}
          >
            <Logo />
            {/* Large screen sizes */}
            <NormalToolbar />
            {/* Small screen sizes */}
            <SmallToolbar />
          </MuiToolbar>
        </Container>
      </AppBar>
    </>
  );
}
