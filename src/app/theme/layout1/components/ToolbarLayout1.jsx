import AppBar from "@mui/material/AppBar";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import NavbarToggleButton from "../../shared-components/navbar/NavbarToggleButton";
import ToogleTheme from "../../shared-components/ToogleTheme";
import LayoutConfig from "../Layout1Config";
import { useNavbar } from "../../../hooks/store/use-navbar";
import aRathiLogo from "../../../../assets/logo/arathi-logo.png";

/**
 * The toolbar layout 1.
 */
const ToolbarLayout1 = observer((props) => {
  const { className } = props;
  const navbar = useNavbar();
  const { defaults: config } = LayoutConfig;
  return (
    <AppBar
      id="fuse-toolbar"
      className={clsx("relative z-20 flex shadow px-12 sm:px-16", className)}
      color="default"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
      position="static"
      elevation={0}
    >
      <Toolbar className="min-h-48 p-0 md:min-h-64">
        <div className="flex flex-1">
          {config.navbar.display && config.navbar.position === "left" && (
            <>
              <Hidden lgDown>
                {(config.navbar.style === "style-3"
                  || config.navbar.style === "style-3-dense") && (
                  <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
                )}

                {config.navbar.style === "style-1" && !navbar.open && (
                  <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
              </Hidden>
            </>
          )}
        </div>

        <div className="flex h-full gap-12 items-center overflow-x-auto">
          <ToogleTheme />
          <img className=" h-32" src={aRathiLogo} alt="logo" />
          {/* <UserMenu /> */}
        </div>

        {config.navbar.display && config.navbar.position === "right" && (
          <>
            <Hidden lgDown>
              {!navbar.open && (
                <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
              )}
            </Hidden>

            <Hidden lgUp>
              <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
            </Hidden>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default ToolbarLayout1;
