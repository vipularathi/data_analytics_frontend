import Drawer from "@mui/material/Drawer";
import Hidden from "@mui/material/Hidden";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import clsx from "clsx";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import FusePageCardedSidebarContent from "./FusePageCardedSidebarContent";
/**
 * The FusePageCardedSidebar component is a sidebar for the FusePageCarded component.
 */
const FusePageCardedSidebar = forwardRef((props, ref) => {
  const { open = true, position, variant, onClose = () => {} } = props;
  const [isOpen, setIsOpen] = useState(open);
  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);
  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));
  useEffect(() => {
    handleToggleDrawer(open);
  }, [handleToggleDrawer, open]);
  return (
    <>
      <Hidden lgUp={variant === "permanent"}>
        <SwipeableDrawer
          variant="temporary"
          anchor={position}
          open={isOpen}
          onOpen={() => {}}
          onClose={() => onClose()}
          disableSwipeToOpen
          classes={{
            root: clsx("FusePageCarded-sidebarWrapper", variant),
            paper: clsx(
              "FusePageCarded-sidebar",
              variant,
              position === "left"
                ? "FusePageCarded-leftSidebar"
                : "FusePageCarded-rightSidebar",
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          BackdropProps={{
            classes: {
              root: "FusePageCarded-backdrop",
            },
          }}
          style={{ position: "absolute" }}
        >
          <FusePageCardedSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>
      {variant === "permanent" && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              "FusePageCarded-sidebarWrapper",
              variant,
              isOpen ? "opened" : "closed",
              position === "left"
                ? "FusePageCarded-leftSidebar"
                : "FusePageCarded-rightSidebar",
            )}
            open={isOpen}
            onClose={onClose}
            classes={{
              paper: clsx("FusePageCarded-sidebar", variant),
            }}
          >
            <FusePageCardedSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});
export default FusePageCardedSidebar;
