export const tokens = {
    grey: {
      100: "#f0f0f3",
      200: "#e1e2e7",
      300: "#d1d3da",
      400: "#c2c5ce",
      500: "#b3b6c2",
      600: "#8f929b",
      700: "#6b6d74",
      800: "#48494e",
      900: "#242427",
    },
    primary: {
      // light green
      100: "#d0fcf4",
      200: "#a0f9e9",
      300: "#71f5de",
      400: "#41f2d3",
      500: "#12efc8",
      600: "#0ebfa0",
      700: "#0b8f78",
      800: "#076050",
      900: "#043028",
    },
    secondary: {
      // dark blue
      100: "#fff2f8",
      200: "#ffe4f0",
      300: "#ffd7e9",
      400: "#ffc9e1",
      500: "#ffbcda",
      600: "#cc96ae",
      700: "#997183",
      800: "#664b57",
      900: "#33262c"
    },
    tertiary: {
      // purple
      500: "#8884d8",
    },
    background: {
      light: "#2d2d34",
      main: "#1f2026",
    },
  };
  
  // mui theme settings
  export const themeSettings = {
    palette: {
      primary: {
        ...tokens.primary,
        main: tokens.primary[500],
        light: tokens.primary[400],
      },
      secondary: {
        ...tokens.secondary,
        main: tokens.secondary[500],
      },
      tertiary: {
        ...tokens.tertiary,
      },
      grey: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      background: {
        default: tokens.background.main,
        light: tokens.background.light,
      },
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 800,
        color: tokens.grey[200],
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 600,
        color: tokens.grey[300],
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        color: tokens.grey[500],
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 10,
        color: tokens.grey[700],
      },
    },
  };
