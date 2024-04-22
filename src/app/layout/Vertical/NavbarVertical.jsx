import { observer } from "mobx-react-lite";
import NavbarStyle1 from "./navbar/style-1/NavbarStyle1";
import settingsConfig from "../../config/settingConfig";

const NavbarVertical = observer(() => (
  <>
    (
    {
    settingsConfig.style === "style1" && <NavbarStyle1 />
    }
    )
  </>
));

export default NavbarVertical;
