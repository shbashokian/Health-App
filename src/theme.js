import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#7e57c2",
      light: "#b085f5",
      dark: "#4d2c91",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f7fa",
      paper: "#fff",
    },
    success: {
      main: "#43a047",
    },
    warning: {
      main: "#ffb300",
    },
    error: {
      main: "#e53935",
    },
    info: {
      main: "#29b6f6",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Vazirmatn", "Arial", sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
