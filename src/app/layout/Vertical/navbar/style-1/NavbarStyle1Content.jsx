import { styled } from "@mui/material";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import Logo from "../../../shared-components/Logo";
import NavbarToggleButton from "../../../shared-components/NavbarToggleButton";
import Navigation from "../../../shared-components/Navigation";
import { useNavbarStore } from "../../../../hooks/store/use-navbar-store";
import { useTheme } from "@emotion/react";

const Root = styled("div")(({ theme, foldedandclosed, foldedandopened }) => ({
  "& .navbar-toggler": {
    ...(foldedandclosed && {
      display: "none",
    }),
    ...(foldedandopened && {
      display: "block",
    }),
  },

  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.24)"}`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.37)" : "rgba(255, 255, 255, 0.37)"}`,
  },
}));

const StyledContent = styled("div")(() => ({
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

  let smallLogo, largeLogo;

  if (theme.palette.mode === "light") {
    smallLogo = "src/assets/logo/finzome-logo.png";
    largeLogo = "src/assets/logo/finzome-logo-icon.png";
  } else {
    smallLogo = "src/assets/logo/finzome-logo-white.png";
    largeLogo = "src/assets/logo/finzome-logo-icon-white.png";
  }

  return (
    <Root
      className={clsx(
        "flex h-full flex-auto flex-col overflow-hidden",
        className
      )}
      foldedandclosed={foldedandclosed}
      foldedandopened={foldedandopened}
    >
      <div
        className={`flex h-48 shrink-0 flex-row items-center  md:h-76 ${foldedandclosed ? "mx-auto" : "px-12"}`}
      >
        <div className="flex flex-1">
          <Logo
            src={foldedandopened || !folded ? smallLogo : largeLogo}
            foldedandopened={foldedandopened}
          />
        </div>

        <div className="navbar-toggler">
          <NavbarToggleButton className="w-40 h-40 p-0" />
        </div>
      </div>

      <StyledContent
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <Navigation layout="vertical" />
      </StyledContent>
    </Root>
  );
});

export default NavbarStyle1Content;
