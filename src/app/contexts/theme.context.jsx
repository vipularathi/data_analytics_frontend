import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import themesConfig from "../config/themeConfig";
import { createContext, useMemo, useState } from "react";

export const themeContext = createContext();

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("themeMode") || "light";
};

const getDesignTokens = (mode) => {
  return mode === "light" ? themesConfig.default : themesConfig.defaultDark;
};

const RootThemeProvider = observer(({ children }) => {
  const [mode, setMode] = useState(getThemeFromLocalStorage());

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
});

export default RootThemeProvider;
