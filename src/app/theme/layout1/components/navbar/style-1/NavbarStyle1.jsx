import Hidden from "@mui/material/Hidden";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { observer } from "mobx-react-lite";
import LayoutConfig from "../../../Layout1Config";
import NavbarStyle1Content from "./NavbarStyle1Content";
import { useNavbar } from "../../../../../hooks/store/use-navbar";

const navbarWidth = 280;
const StyledNavBar = styled("div")(({ theme, open, position }) => ({
  minWidth: navbarWidth,
  width: navbarWidth,
  maxWidth: navbarWidth,
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(position === "left" && {
      marginLeft: `-${navbarWidth}px`,
    }),
    ...(position === "right" && {
      marginRight: `-${navbarWidth}px`,
    }),
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const StyledNavBarMobile = styled(SwipeableDrawer)(() => ({
  "& .MuiDrawer-paper": {
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth,
  },
}));

/**
 * The navbar style 1.
 */
const NavbarStyle1 = observer(() => {
  const { defaults: config } = LayoutConfig;
  const navbar = useNavbar();
  return (
    <>
      <Hidden lgDown>
        <StyledNavBar
          className="sticky top-0 z-20 h-screen flex-auto shrink-0 flex-col overflow-hidden shadow"
          open={navbar.open}
          position={config.navbar.position}
        >
          <NavbarStyle1Content />
        </StyledNavBar>
      </Hidden>

      <Hidden lgUp>
        <StyledNavBarMobile
          classes={{
            paper: "flex-col flex-auto h-full",
          }}
          anchor={config.navbar.position}
          variant="temporary"
          open={navbar.mobileOpen}
          onClose={() => navbar.navbarCloseMobile()}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <NavbarStyle1Content />
        </StyledNavBarMobile>
      </Hidden>
    </>
  );
});

export default NavbarStyle1;
