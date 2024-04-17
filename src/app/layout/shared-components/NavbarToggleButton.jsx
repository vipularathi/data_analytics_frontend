import { observer } from "mobx-react-lite";
import IconButton from "@mui/material/IconButton";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useNavbarStore } from "../../hooks/store/use-navbar-store";
import { useMediaQuery } from "@mui/material";
import settingsConfig from "../../config/settingConfig";

const NavbarToggleButton = observer(() => {
  const navbar = useNavbarStore();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <IconButton
      color="inherit"
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
      <ViewListIcon />
    </IconButton>
  );
});

export default NavbarToggleButton;
