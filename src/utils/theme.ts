import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    backgroundLight?: string;
    backgroundDark?: string;
    russianGreen?: string;
    pastelYellow?: string;
    lightGreen?: string;
    celadonGreen?: string;
    textLight?: string;
    textDark?: string;
    cardLight?: string;
    cardDark?: string;
    textMutedLight?: string;
    borderLight?: string;
    borderGray200?:string
  }
  interface SimplePaletteColorOptions {
    backgroundLight?: string;
    backgroundDark?: string;
    russianGreen?: string;
    pastelYellow?: string;
    lightGreen?: string;
    celadonGreen?: string;
    textLight?: string;
    textDark?: string;
    cardLight?: string;
    cardDark?: string;
    textMutedLight?: string;
    borderLight?: string;
    borderGray200?:string;
  }

  interface Theme {
    custom?: {
      borderRadius: number;
      // add more custom theme values here
    };
  }
  interface ThemeOptions {
    custom?: {
      borderRadius?: number;
      // add more custom theme values here
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6ba259",
      contrastText: "#fff",
      backgroundLight: "#e0f7fa",
      backgroundDark: "#152210",
      russianGreen: "#6BA259",
      pastelYellow: "#F7F39A",
      lightGreen: "#A3DD83",
      celadonGreen: "#38817A",
      textLight: "#1f2937",
      textDark: "#f9fafb",
      cardLight: "#ffffff",
      cardDark: "#1f2937",
      textMutedLight: "#6b7280",
      borderLight: "#e5e7eb",
      borderGray200: '#f6f3f4',
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
