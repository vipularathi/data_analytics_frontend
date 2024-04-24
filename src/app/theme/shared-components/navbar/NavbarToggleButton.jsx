import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import LucideIcon from "../../../components/LucideIcon";
import useThemeMediaQuery from "../../../hooks/use-thememediaquery";
import { useNavbar } from "../../../hooks/store/use-navbar";
import layoutConfig from "../../layout1/Layout1Config";

/**
 * The navbar toggle button.
 */
const NavbarToggleButton = observer((props) => {
  const {
    className = "",
    children = (
      <LucideIcon
        name="align-justify"
        className={clsx("fuse-list-item-icon shrink-0")}
      />
    ),
  } = props;
  const { defaults: config } = layoutConfig;
  const navbar = useNavbar();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <IconButton
      className={className}
      color="inherit"
      size="small"
      onClick={() => {
        if (isMobile) {
          navbar.navbarToggleMobile();
        } else if (config?.navbar?.style === "style-2") {
          navbar.navbarFolded();
        } else {
          navbar.navbarToggle();
        }
      }}
    >
      {children}
    </IconButton>
  );
});

export default NavbarToggleButton;
