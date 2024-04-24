import { styled } from "@mui/material/styles";
import { memo } from "react";
import FooterLayout1 from "./components/FooterLayout1";
import LeftSideLayout1 from "./components/LeftSideLayout1";
import NavbarWrapperLayout1 from "./components/NavbarWrapperLayout1";
import ToolbarLayout1 from "./components/ToolbarLayout1";
import LayoutConfig from "./Layout1Config";

const Root = styled("div")(({ config }) => ({
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `${config.containerWidth}px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}));

/**
 * The layout 1.
 */
function Layout1(props) {
  const { children } = props;
  const { defaults: config } = LayoutConfig;
  return (
    <Root id="fuse-layout" config={config} className="flex w-full">
      {config.leftSidePanel.display && <LeftSideLayout1 />}

      <div className="flex min-w-0 flex-auto">
        {config.navbar.display && config.navbar.position === "left" && (
          <NavbarWrapperLayout1 />
        )}

        <main
          id="fuse-main"
          className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
        >
          {config.toolbar.display && (
            <ToolbarLayout1
              className={config.toolbar.style === "fixed" ? "sticky top-0" : ""}
            />
          )}

          <div className="relative z-10 flex min-h-0 flex-auto flex-col">
            {children}
          </div>

          {config.footer.display && (
            <FooterLayout1
              className={
                config.footer.style === "fixed" ? "sticky bottom-0" : ""
              }
            />
          )}
        </main>

        {config.navbar.display && config.navbar.position === "right" && (
          <NavbarWrapperLayout1 />
        )}
      </div>
    </Root>
  );
}

export default memo(Layout1);
