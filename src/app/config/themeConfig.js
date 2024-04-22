/**
 * The lightPaletteText object defines the text color palette for the light theme.
 */
export const lightPaletteText = {
  primary: "rgb(17, 24, 39)",
  secondary: "rgb(107, 114, 128)",
  disabled: "rgb(149, 156, 169)",
};
/**
 * The darkPaletteText object defines the text color palette for the dark theme.
 */
export const darkPaletteText = {
  primary: "#d1d4dc",
  secondary: "#979eb0",
  disabled: "#b4b9c6",
};
/**
 * The themesConfig object is a configuration object for the color themes.
 */
const themesConfig = {
  default: {
    palette: {
      mode: "light",
      divider: "#e2e8f0",
      text: lightPaletteText,
      common: {
        black: "rgb(17, 24, 39)",
        white: "rgb(255, 255, 255)",
      },
      primary: {
        light: "#64748b",
        main: "#1e293b",
        dark: "#0f172a",
        contrastText: lightPaletteText.primary,
      },
      secondary: {
        light: "#818cf8",
        main: "#4f46e5",
        dark: "#3730a3",
        contrastText: lightPaletteText.primary,
      },
      background: {
        paper: "#FFFFFF",
        default: "#f1f5f9",
      },
      error: {
        light: "#ffcdd2",
        main: "#f44336",
        dark: "#b71c1c",
        contrastText: lightPaletteText.primary,
      },
      chart: {
        borderColor: "#e9ecee",
        cardColor: "#fff",
        headingColor: "#516377",
      },
    },
  },
  defaultDark: {
    palette: {
      mode: "dark",
      divider: "rgba(241,245,249,.12)",
      text: darkPaletteText,
      common: {
        black: "rgb(17, 24, 39)",
        white: "rgb(255, 255, 255)",
      },
      primary: {
        light: "#64748b",
        main: "#334155",
        dark: "#0f172a",
        contrastText: darkPaletteText.primary,
      },
      secondary: {
        light: "#818cf8",
        main: "#4f46e5",
        dark: "#3730a3",
        contrastText: darkPaletteText.primary,
      },
      background: {
        paper: "#131722",
        default: "#2a2e39",
      },
      error: {
        light: "#ffcdd2",
        main: "#f44336",
        dark: "#b71c1c",
      },
      chart: {
        borderColor: "#36445d",
        cardColor: "#131722", // 283144
        headingColor: "#d1d4dc", // d8deea
      },
    },
  },
};
export default themesConfig;
