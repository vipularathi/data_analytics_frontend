import { AppBar, Hidden, IconButton, Toolbar, useTheme } from "@mui/material";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import NavbarToggleButton from "../shared-components/NavbarToggleButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../contexts/theme.context";
import aRathiLogo from "../../../assets/logo/arathi-logo.png";

const ToolbarLayout1 = observer(({ className }) => {
  const colorMode = useThemeMode();
  const theme = useTheme();
  return (
    <AppBar
      id="toolbar1"
      className={clsx("relative flex shadow", className)}
      color="default"
      position="static"
      elevation={0}
    >
      <Toolbar className="min-h-48 z-5 p-0 md:min-h-64'">
        <div className="flex flex-1 px-16">
          <Hidden lgUp>
            <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
          </Hidden>
        </div>

        <div className="flex h-full items-center gap-4 overflow-x-auto px-8">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <img className=" h-20" src={aRathiLogo} alt="logo" />
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default ToolbarLayout1;
