import { styled } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavbar } from "../../hooks/store/use-navbar";
import largeLightLogo from "../../../assets/logo/arathi-logo.png";
import largeDarkLogo from "../../../assets/logo/finzome-logo-white.png";
import smallLightLogo from "../../../assets/logo/arathi-logo-icon.png";
import smallDarkLogo from "../../../assets/logo/finzome-logo-icon-white.png";
import Layout1Config from "../layout1/Layout1Config";

const Root = styled("div")(({ theme }) => ({
  "& > .logo-icon": {
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "& > .badge": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

/**
 * The logo component.
 */
const Logo = observer(() => {
  const theme = useTheme();
  const { defaults: config } = Layout1Config;
  const navbar = useNavbar();
  const { folded } = navbar;
  const foldedandopened = folded && navbar.foldedOpen;
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  let smallLogo;
  let largeLogo;

  if (theme.palette.mode === "light") {
    smallLogo = smallLightLogo;
    largeLogo = largeLightLogo;
  } else {
    smallLogo = smallDarkLogo;
    largeLogo = largeDarkLogo;
  }
  return (
    <Root className="flex items-center">
      <img
        className="logo-icon h-40"
        alt="logo"
        src={
          // eslint-disable-next-line no-nested-ternary
          isMobile
            ? largeLogo
            : foldedandopened || !folded || config.navbar.style === "style-1"
              ? largeLogo
              : smallLogo
        }
      />
    </Root>
  );
});

export default Logo;
