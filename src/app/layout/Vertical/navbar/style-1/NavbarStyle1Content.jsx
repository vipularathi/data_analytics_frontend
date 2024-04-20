import { styled, useMediaQuery, useTheme } from "@mui/material";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import Logo from "../../../shared-components/Logo";
import NavbarToggleButton from "../../../shared-components/NavbarToggleButton";
import Navigation from "../../../shared-components/Navigation";
import { useNavbarStore } from "../../../../hooks/store/use-navbar-store";

import largeLightLogo from "../../../../../assets/logo/finzome-logo.png";
import largeDarkLogo from "../../../../../assets/logo/finzome-logo-white.png";
import smallLightLogo from "../../../../../assets/logo/finzome-logo-icon.png";
import smallDarkLogo from "../../../../../assets/logo/finzome-logo-icon-white.png";

const Root = styled("div")(({ theme, foldedandclosed, foldedandopened }) => ({
  background:
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#fff",
  "& .navbar-toggler": {
    ...(foldedandclosed && {
      display: "none",
    }),
    ...(foldedandopened && {
      display: "block",
    }),
  },
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.24)"}`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.37)" : "rgba(255, 255, 255, 0.37)"}`,
  },
}));

const StyledContent = styled("div")(() => ({
  paddingTop: 12,
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  background:
    "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
}));
const NavbarStyle1Content = observer(({ className }) => {
  const theme = useTheme();
  const navbar = useNavbarStore();
  const folded = navbar.folded;
  const foldedandclosed = folded && !navbar.foldedOpen;
  const foldedandopened = folded && navbar.foldedOpen;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  let smallLogo, largeLogo;

  if (theme.palette.mode === "light") {
    smallLogo = smallLightLogo;
    largeLogo = largeLightLogo;
  } else {
    smallLogo = smallDarkLogo;
    largeLogo = largeDarkLogo;
  }

  return (
    <Root
      className={clsx(
        "flex h-full flex-auto flex-col overflow-hidden shadow-md",
        className
      )}
      foldedandclosed={foldedandclosed}
      foldedandopened={foldedandopened}
    >
      <div
        className={`flex min-h-40 shrink-1 flex-row items-center ${foldedandclosed ? "mx-6" : "px-12"}`}
      >
        <div className="flex flex-1">
          <Logo
            src={
              isMobile
                ? largeLogo
                : foldedandopened || !folded
                  ? largeLogo
                  : smallLogo
            }
            foldedandopened={foldedandopened || !folded}
          />
        </div>

        <div className="navbar-toggler">
          <NavbarToggleButton className="w-40 h-40 p-0" />
        </div>
      </div>

      <StyledContent
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <Navigation />
      </StyledContent>
    </Root>
  );
});

export default NavbarStyle1Content;
