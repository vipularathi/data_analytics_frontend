import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import themesConfig from "../config/themeConfig";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const colorModeContext = createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode) => {
  return mode === "light" ? themesConfig.default : themesConfig.defaultDark;
};

const RootThemeProvider = observer(({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    setMode(localStorage.getItem("themeMode") || "light");
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        localStorage.setItem("themeMode", newMode);
        setMode(newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </colorModeContext.Provider>
  );
});

export default RootThemeProvider;

export const useThemeMode = () => {
  return useContext(colorModeContext);
};
