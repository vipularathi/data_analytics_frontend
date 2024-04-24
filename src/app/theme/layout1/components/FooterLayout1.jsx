import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { memo } from "react";
import clsx from "clsx";
import Copyright from "../../../components/Copyright";

function FooterLayout1(props) {
  const { className } = props;
  return (
    <AppBar
      id="fuse-footer"
      className={clsx("relative z-20 shadow-md", className)}
      color="default"
      elevation={0}
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === "light"
          ? theme.palette.background.paper
          : theme.palette.background.default),
      }}
    >
      <Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto justify-center">
        <Copyright />
      </Toolbar>
    </AppBar>
  );
}

export default memo(FooterLayout1);
