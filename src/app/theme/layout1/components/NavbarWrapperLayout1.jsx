import { useRouterState } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import NavbarStyle1 from "./navbar/style-1/NavbarStyle1";
import NavbarStyle2 from "./navbar/style-2/NavbarStyle2";
import NavbarStyle3 from "./navbar/style-3/NavbarStyle3";
import LayoutConfig from "../Layout1Config";
import useThemeMediaQuery from "../../../hooks/use-thememediaquery";
import { useNavbar } from "../../../hooks/store/use-navbar";
import NavbarToggleFabLayout1 from "./NavbarToggleFabLayout1";

/**
 * The navbar wrapper layout 1.
 */
const NavbarWrapperLayout1 = observer(() => {
  const { defaults: config } = LayoutConfig;
  const navbar = useNavbar();
  const location = useRouterState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { pathname } = location;
  useEffect(() => {
    if (isMobile) {
      navbar.navbarCloseMobile();
    }
  }, [pathname, isMobile]);
  return (
    <>
      <>
        {config.navbar.style === "style-1" && <NavbarStyle1 />}
        {config.navbar.style === "style-2" && <NavbarStyle2 />}
        {config.navbar.style === "style-3" && <NavbarStyle3 />}
        {config.navbar.style === "style-3-dense" && <NavbarStyle3 dense />}
      </>
      {config.navbar.display && !config.toolbar.display && !navbar.open && (
        <NavbarToggleFabLayout1 />
      )}
    </>
  );
});

export default NavbarWrapperLayout1;
