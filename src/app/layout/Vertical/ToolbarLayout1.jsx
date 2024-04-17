import { AppBar, Hidden, IconButton, Toolbar } from "@mui/material";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import NavbarToggleButton from "../shared-components/NavbarToggleButton";
import LightModeIcon from "@mui/icons-material/LightMode";

const ToolbarLayout1 = observer(({ className }) => {
  const handleThemeMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <AppBar
      id="toolbar1"
      className={clsx("relative flex shadow", className)}
      color="default"
      position="static"
      elevation={0}
    >
      <Toolbar className="min-h-48 p-0 md:min-h-64">
        <div className="flex flex-1 px-16">
          <Hidden lgUp>
            <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
          </Hidden>
        </div>

        <div className="flex h-full items-center gap-4 overflow-x-auto px-8">
          <IconButton onClick={handleThemeMode}>
            <LightModeIcon />
          </IconButton>
          <img
            className=" h-20"
            src="src/assets/logo/arathi-logo.png"
            alt="logo"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default ToolbarLayout1;
