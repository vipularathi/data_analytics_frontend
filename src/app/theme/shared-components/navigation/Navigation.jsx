// eslint-disable-next-line import/no-unresolved
import FuseNavigation from "@core/core/FuseNavigation";
import clsx from "clsx";
import { memo, useMemo } from "react";
import navigation from "../../../configs/navigationConfig";
import useThemeMediaQuery from "../../../hooks/use-thememediaquery";

function Navigation(props) {
  const { className = "", layout = "vertical", dense, active } = props;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return useMemo(() => {
    function handleItemClick() {
      if (isMobile) {
        // dispatch(navbarCloseMobile());
      }
    }

    return (
      <FuseNavigation
        className={clsx("navigation flex-1", className)}
        navigation={navigation}
        layout={layout}
        dense={dense}
        active={active}
        onItemClick={(i) => handleItemClick(i)}
        checkPermission
      />
    );
  }, [isMobile, navigation, active, className, dense, layout]);
}

export default memo(Navigation);
