import { useEffect, useLayoutEffect, useMemo } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
  alpha,
} from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { observer } from "mobx-react-lite";
import palette from "./palette";
import { useTheme } from "../hooks/store/use-theme";

const useEnhancedEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        backgroundColor: `${theme.palette.background.default}!important`,
        color: `${theme.palette.text.primary}!important`,
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      "table.simple tbody tr th": {
        borderColor: theme.palette.divider,
      },
      "table.simple thead tr th": {
        borderColor: theme.palette.divider,
      },
      "a:not([role=button]):not(.MuiButtonBase-root)": {
        color: theme.palette.secondary.main,
        textDecoration: "underline",
        "&:hover": {},
      },
      "a.link, a:not([role=button])[target=_blank]": {
        background: alpha(theme.palette.secondary.main, 0.2),
        color: "inherit",
        borderBottom: `1px solid ${theme.palette.divider}`,
        textDecoration: "none",
        "&:hover": {
          background: alpha(theme.palette.secondary.main, 0.3),
          textDecoration: "none",
        },
      },
      "[class^=\"border\"]": {
        borderColor: theme.palette.divider,
      },
      "[class*=\"border\"]": {
        borderColor: theme.palette.divider,
      },
      "[class*=\"divide-\"] > :not([hidden]) ~ :not([hidden])": {
        borderColor: theme.palette.divider,
      },
      hr: {
        borderColor: theme.palette.divider,
      },
      "::-webkit-scrollbar-thumb": {
        boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.24)"}`,
      },
      "::-webkit-scrollbar-thumb:active": {
        boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.37)" : "rgba(255, 255, 255, 0.37)"}`,
      },
    })}
  />
);

const ThemeProvider = observer(({ children }) => {
  const themeMode = useTheme();
  useEnhancedEffect(() => {
    document.body.classList.add(themeMode.mode === "default" ? "light" : "dark");
    document.body.classList.remove(themeMode.mode === "defaultDark" ? "dark" : "light");
  }, [themeMode]);

  const themeOptions = useMemo(
    () => ({
      palette: palette(themeMode.mode),
      typography: {
        fontFamily: [
          "Inter var",
          "Roboto",
          "\"Helvetica\"",
          "Arial",
          "sans-serif",
        ].join(","),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        htmlFontSize: 10,
        fontSize: 14,
        body1: {
          fontSize: "1.4rem",
        },
        body2: {
          fontSize: "1.4rem",
        },
      },
    }),
    [themeMode.mode],
  );

  const theme = createTheme(themeOptions);
  theme.components = {
    MuiDateTimePicker: {
      defaultProps: {
        PopperProps: { className: "z-9999" },
      },
    },
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "text",
        color: "inherit",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          // lineHeight: 1,
        },
        sizeMedium: {
          borderRadius: 20,
          height: 40,
          minHeight: 40,
          maxHeight: 40,
        },
        sizeSmall: {
          borderRadius: "15px",
        },
        sizeLarge: {
          borderRadius: "28px",
        },
        contained: {
          boxShadow: "none",
          "&:hover, &:focus": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        color: "secondary",
      },
      styleOverrides: {
        contained: {
          borderRadius: 18,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiSelect: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          minHeight: 40,
          lineHeight: 1,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          "&:before, &:after": {
            display: "none",
          },
        },
      },
    },
    MuiSlider: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "secondary",
      },
    },
    MuiTypography: {
      variants: [
        {
          props: { color: "text.secondary" },
          style: {
            color: "text.secondary",
          },
        },
      ],
    },
  };

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {inputGlobalStyles}
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
});

export default ThemeProvider;
