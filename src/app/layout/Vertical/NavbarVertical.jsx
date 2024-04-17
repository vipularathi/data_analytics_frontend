import { observer } from "mobx-react-lite";
import React from "react";
import NavbarStyle1 from "./navbar/style-1/NavbarStyle1";
import settingsConfig from "../../config/settingConfig";

const NavbarVertical = observer(() => {
  return <>{settingsConfig.style === "style1" && <NavbarStyle1 />}</>;
});

export default NavbarVertical;
