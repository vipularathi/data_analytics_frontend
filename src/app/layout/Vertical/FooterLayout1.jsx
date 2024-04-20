import { AppBar, Toolbar } from "@mui/material";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import Copyright from "../../components/Copyright";

const FooterLayout1 = observer(() => {
  return (
    <AppBar
      id="fuse-footer"
      className={clsx("relative z-20 shadow")}
      position="default"
      color="default"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.background.default,
        zIndex: 1,
      }}
      elevation={0}
    >
      <Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center justify-center overflow-x-auto">
        <Copyright />
      </Toolbar>
    </AppBar>
  );
});

export default FooterLayout1;
