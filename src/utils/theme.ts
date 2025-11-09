import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6ba259",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#6ba259",
          color: "#fff",
          textTransform: "none",
          fontWeight: 600,
          paddingTop: "8px",
          paddingBottom: "8px",
          borderRadius: "6px",
          "&:hover": {
            backgroundColor: "#38817a",
          },
        },
        outlined: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
