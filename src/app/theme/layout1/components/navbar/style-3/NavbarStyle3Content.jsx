/* eslint-disable import/no-unresolved */
import FuseScrollbars from "@core/core/FuseScrollbars";
import { styled, useTheme } from "@mui/material/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import clsx from "clsx";
import { memo, useState } from "react";
import FuseNavigation from "@core/core/FuseNavigation";
import isUrlInChildren from "@core/core/FuseNavigation/isUrlInChildren";
import { observer } from "mobx-react-lite";
import navigation from "../../../../../configs/navigationConfig";
import useThemeMediaQuery from "../../../../../hooks/use-thememediaquery";
import { useNavbar } from "../../../../../hooks/store/use-navbar";
import smallDarkLogo from "../../../../../../assets/logo/finzome-logo-icon-white.png";
import smallLightLogo from "../../../../../../assets/logo/finzome-logo-icon.png";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));
const StyledPanel = styled(FuseScrollbars)(({ theme, opened }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(["opacity"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  opacity: 0,
  pointerEvents: "none",
  ...(opened && {
    opacity: 1,
    pointerEvents: "initial",
  }),
}));

/**
 * Check if the item needs to be opened.
 */
function _needsToBeOpened(location, item) {
  return location && isUrlInChildren(item, location.pathname);
}

/**
 * The navbar style 3 content.
 */
const NavbarStyle3Content = observer((props) => {
  const theme = useTheme();
  const { className = "", dense = false } = props;
  const navbar = useNavbar();
  const isMobile = useThemeMediaQuery(() => theme.breakpoints.down("lg"));
  const [selectedNavigation, setSelectedNavigation] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  // const location = useLocation();
  // useEffect(() => {
  //  navigation?.forEach((item) => {
  //  if (needsToBeOpened(location, item)) {
  //  setSelectedNavigation([item]);
  //  }
  //  });
  // }, [navigation, location]);

  function handleParentItemClick(selected) {
    /** if there is no child item do not set/open panel
     */
    if (!selected.children) {
      setSelectedNavigation([]);
      setPanelOpen(false);
      return;
    }

    /**
     * If navigation already selected toggle panel visibility
     */
    if (selectedNavigation[0]?.id === selected.id) {
      setPanelOpen(!panelOpen);
    } else {
      /**
       * Set navigation and open panel
       */
      setSelectedNavigation([selected]);
      setPanelOpen(true);
    }
  }

  function handleChildItemClick() {
    setPanelOpen(false);

    if (isMobile) {
      navbar.navbarCloseMobile();
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setPanelOpen(false)}>
      <Root className={clsx("flex h-full flex-auto", className)}>
        <div
          id="fuse-navbar-side-panel"
          className="flex shrink-0 flex-col items-center"
        >
          <img
            className="my-10 w-36 md:w-44"
            src={
              theme.palette.mode === "light" ? smallLightLogo : smallDarkLogo
            }
            alt="logo"
          />

          <FuseScrollbars
            className="flex min-h-0 w-full flex-1 justify-center overflow-y-auto overflow-x-hidden"
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <FuseNavigation
              className={clsx("navigation")}
              navigation={navigation}
              layout="vertical-2"
              onItemClick={(i) => handleParentItemClick(i)}
              firstLevel
              selectedId={selectedNavigation[0]?.id}
              dense={Boolean(dense)}
            />
          </FuseScrollbars>
        </div>

        {selectedNavigation.length > 0 && (
          <StyledPanel
            id="fuse-navbar-panel"
            opened={panelOpen}
            className={clsx("overflow-y-auto overflow-x-hidden shadow")}
            option={{ suppressScrollX: true, wheelPropagation: false }}
          >
            <FuseNavigation
              className={clsx("navigation")}
              navigation={selectedNavigation}
              layout="vertical"
              onItemClick={(i) => handleChildItemClick(i)}
            />
          </StyledPanel>
        )}
      </Root>
    </ClickAwayListener>
  );
});

export default memo(NavbarStyle3Content);
