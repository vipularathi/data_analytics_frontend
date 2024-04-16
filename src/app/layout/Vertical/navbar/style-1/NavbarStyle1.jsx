import { observer } from "mobx-react-lite";
import NavbarStyle1Content from "./NavbarStyle1Content";
import { Hidden, SwipeableDrawer, styled } from "@mui/material";

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
    marginLeft: `-${navbarWidth}px`,
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

const NavbarStyle1 = observer(() => {
  return (
    <>
      <Hidden lgDown>
        <StyledNavBar
          className="sticky top-0 z-20 h-screen flex-auto shrink-0 flex-col overflow-hidden shadow"
          open={true}
        >
          <NavbarStyle1Content />
        </StyledNavBar>
      </Hidden>

      <Hidden lgUp>
        <StyledNavBarMobile
          classes={{
            paper: "flex-col flex-auto h-full",
          }}
          variant="temporary"
          open={true}
          onClose={() => dispatch(navbarCloseMobile())}
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
