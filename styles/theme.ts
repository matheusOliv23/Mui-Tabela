import { createTheme } from "@mui/material";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A1A40",
    },
    secondary: {
      main: "#0f0",
    },
  },
  typography: {
    fontFamily: "Roboto",
    body2: {
      fontFamily: "Roboto",
      fontSize: "1.1rem",
    },
  },
  shape: {
    borderRadius: 30,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: 200,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          cursor: "pointer",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          backgroundColor: "#0f0",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          background: "green",
          color: "white",
        },
      },
    },
  },
});
