import { observer } from "mobx-react-lite";
import NavbarStyle1Content from "./NavbarStyle1Content";
import { Hidden, SwipeableDrawer, styled } from "@mui/material";
import { useNavbarStore } from "../../../../hooks/store/use-navbar-store";

const navbarWidth = 280;
const Root = styled("div")(({ theme, folded }) => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 4,
  [theme.breakpoints.up("lg")]: {
    width: navbarWidth,
    minWidth: navbarWidth,
  },
  ...(folded && {
    [theme.breakpoints.up("lg")]: {
      width: 76,
      minWidth: 76,
    },
  }),
}));
const StyledNavbar = styled("div")(
  ({ theme, folded, foldedandopened, foldedandclosed }) => ({
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth,
    maxHeight: "100%",
    transition: theme.transitions.create(["width", "min-width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    left: 0,

    ...(folded && {
      position: "absolute",
      width: 76,
      minWidth: 76,
      top: 0,
      bottom: 0,
    }),
    ...(foldedandopened && {
      width: navbarWidth,
      minWidth: navbarWidth,
    }),
    ...(foldedandclosed && {
      "& .NavbarStyle2-content": {
        "& .logo-icon": {
          width: 44,
          height: 44,
        },
        "& .logo-text": {
          opacity: 0,
        },
        "& .react-badge": {
          opacity: 0,
        },
        "& .fuse-list-item": {
          width: 56,
        },
        "& .fuse-list-item-text, & .arrow-icon, & .item-badge": {
          opacity: 0,
        },
        "& .fuse-list-subheader .fuse-list-subheader-text": {
          opacity: 0,
        },
        "& .fuse-list-subheader:before": {
          content: '""',
          display: "block",
          position: "absolute",
          minWidth: 16,
          borderTop: "2px solid",
          opacity: 0.2,
        },
        "& .collapse-children": {
          display: "none",
        },
      },
    }),
  })
);
const StyledNavbarMobile = styled(SwipeableDrawer)(({ theme }) => ({
  "& > .MuiDrawer-paper": {
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth,
    maxHeight: "100%",
    transition: theme.transitions.create(["width", "min-width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

const NavbarStyle1 = observer(() => {
  const navbar = useNavbarStore();
  const folded = navbar.folded;
  const foldedandclosed = folded && !navbar.foldedOpen;
  const foldedandopened = folded && navbar.foldedOpen;

  return (
    <Root
      folded={folded ? 1 : 0}
      open={navbar.open}
      id="fuse-navbar"
      className="sticky top-0 z-20 h-screen shrink-0 shadow"
    >
      <Hidden lgDown>
        <StyledNavbar
          className="flex-auto flex-col"
          folded={folded ? 1 : 0}
          foldedandopened={foldedandopened ? 1 : 0}
          foldedandclosed={foldedandclosed ? 1 : 0}
          onMouseEnter={() => foldedandclosed && navbar.navbarOpenFolded()}
          onMouseLeave={() => foldedandopened && navbar.navbarCloseFolded()}
        >
          <NavbarStyle1Content className="NavbarStyle2-content" />
        </StyledNavbar>
      </Hidden>

      <Hidden lgUp>
        <StyledNavbarMobile
          classes={{
            paper: "flex-col flex-auto h-full",
          }}
          folded={folded ? 1 : 0}
          foldedandopened={foldedandopened ? 1 : 0}
          foldedandclosed={foldedandclosed ? 1 : 0}
          variant="temporary"
          open={navbar.mobileOpen}
          onClose={() => navbar.navbarCloseMobile()}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <NavbarStyle1Content className="NavbarStyle2-content" />
        </StyledNavbarMobile>
      </Hidden>
    </Root>
  );
});

export default NavbarStyle1;
