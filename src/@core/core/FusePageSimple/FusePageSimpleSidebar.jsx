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
import FusePageSimpleSidebarContent from "./FusePageSimpleSidebarContent";
/**
 * The FusePageSimpleSidebar component.
 */
const FusePageSimpleSidebar = forwardRef((props, ref) => {
  const { open = true, position, variant, onClose = () => {} } = props;
  const [isOpen, setIsOpen] = useState(open);
  useImperativeHandle(ref, () => ({
    toggleSidebar: handleToggleDrawer,
  }));
  const handleToggleDrawer = useCallback((val) => {
    setIsOpen(val);
  }, []);
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
            root: clsx("FusePageSimple-sidebarWrapper", variant),
            paper: clsx(
              "FusePageSimple-sidebar",
              variant,
              position === "left"
                ? "FusePageSimple-leftSidebar"
                : "FusePageSimple-rightSidebar",
              "max-w-full",
            ),
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          // container={rootRef.current}
          BackdropProps={{
            classes: {
              root: "FusePageSimple-backdrop",
            },
          }}
          style={{ position: "absolute" }}
        >
          <FusePageSimpleSidebarContent {...props} />
        </SwipeableDrawer>
      </Hidden>

      {variant === "permanent" && (
        <Hidden lgDown>
          <Drawer
            variant="permanent"
            anchor={position}
            className={clsx(
              "FusePageSimple-sidebarWrapper",
              variant,
              isOpen ? "opened" : "closed",
              position === "left"
                ? "FusePageSimple-leftSidebar"
                : "FusePageSimple-rightSidebar",
            )}
            open={isOpen}
            onClose={onClose}
            classes={{
              paper: clsx("FusePageSimple-sidebar border-0", variant),
            }}
          >
            <FusePageSimpleSidebarContent {...props} />
          </Drawer>
        </Hidden>
      )}
    </>
  );
});
export default FusePageSimpleSidebar;
