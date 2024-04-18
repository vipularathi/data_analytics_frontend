import { observer } from "mobx-react-lite";
import { styled } from "@mui/material";
import NavbarVertical from "./NavbarVertical";
import settingsConfig from "../../config/settingConfig";
import ToolbarLayout1 from "./ToolbarLayout1";

const Root = styled("div")(({ config }) => ({
  ...(config.mode === "boxed" && {
    clipPath: "inset(0)",
    maxWidth: `1570px`,
    margin: "0 auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `1570px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}));

const Vertical = observer(({ children }) => {
  return (
    <Root config={settingsConfig} className="flex w-full">
      <div className="flex min-w-0 flex-auto">
        <NavbarVertical />
        <main
          id="fuse-main"
          className="relative flex min-h-full min-w-0 flex-auto flex-col"
        >
          <ToolbarLayout1 />
          <div className="relative flex min-h-0 flex-auto flex-col">
            {children}
          </div>
        </main>
      </div>
    </Root>
  );
});

export default Vertical;
