import { observer } from "mobx-react-lite";
import React from "react";
import { useSettings } from "../../hooks/store/use-settings";
import NavbarStyle1 from "./navbar/style-1/NavbarStyle1";

const NavbarVertical = observer(() => {
  const settings = useSettings();

  return <>{settings.style === "style1" && <NavbarStyle1 />}</>;
});

export default NavbarVertical;
