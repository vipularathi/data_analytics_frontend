import { observer } from "mobx-react-lite";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useNavbarStore } from "../../hooks/store/use-navbar-store";
import { useMediaQuery } from "@mui/material";
import settingsConfig from "../../config/settingConfig";

const NavbarToggleButton = observer(({ classname = "" }) => {
  const navbar = useNavbarStore();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <IconButton
      className={classname}
      size="small"
      onClick={() => {
        if (isMobile) {
          navbar.navbarToggleMobile();
        } else if (settingsConfig.style === "style1") {
          navbar.navbarFolded();
        } else {
          navbar.navbarToggle();
        }
      }}
    >
      <MenuRoundedIcon />
    </IconButton>
  );
});

export default NavbarToggleButton;
