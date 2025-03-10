/* eslint-disable react/jsx-props-no-spreading */
import Divider from "@mui/material/Divider";
import { memo } from "react";
import GlobalStyles from "@mui/material/GlobalStyles";
import FuseNavVerticalLayout1 from "./vertical/FuseNavVerticalLayout1";
import FuseNavVerticalLayout2 from "./vertical/FuseNavVerticalLayout2";
import FuseNavVerticalCollapse from "./vertical/types/FuseNavVerticalCollapse";
import FuseNavVerticalGroup from "./vertical/types/FuseNavVerticalGroup";
import FuseNavVerticalItem from "./vertical/types/FuseNavVerticalItem";
import FuseNavVerticalLink from "./vertical/types/FuseNavVerticalLink";
import { registerComponent } from "./FuseNavItem";

const inputGlobalStyles = (
  <GlobalStyles
    styles={() => ({
      ".popper-navigation-list": {
        "& .fuse-list-item": {
          padding: "8px 12px 8px 12px",
          height: 40,
          minHeight: 40,
          "& .fuse-list-item-text": {
            padding: "0 0 0 8px",
          },
        },
        "&.dense": {
          "& .fuse-list-item": {
            minHeight: 32,
            height: 32,
            "& .fuse-list-item-text": {
              padding: "0 0 0 8px",
            },
          },
        },
      },
    })}
  />
);
/*
Register Fuse Navigation Components
 */
registerComponent("vertical-group", FuseNavVerticalGroup);
registerComponent("vertical-collapse", FuseNavVerticalCollapse);
registerComponent("vertical-item", FuseNavVerticalItem);
registerComponent("vertical-link", FuseNavVerticalLink);
registerComponent("divider", () => <Divider className="my-16" />);
registerComponent("vertical-divider", () => <Divider className="my-16" />);
registerComponent("horizontal-divider", () => <Divider className="my-16" />);

/**
 * FuseNavigation
 * Component for displaying a navigation bar which contains FuseNavItem components
 * and acts as parent for providing props to its children components
 */
function FuseNavigation(props) {
  const { navigation, layout = "vertical" } = props;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  return (
    <>
      {inputGlobalStyles}
      {layout === "vertical" && (
        <FuseNavVerticalLayout1 checkPermission={false} {...props} />
      )}
      {layout === "vertical-2" && (
        <FuseNavVerticalLayout2 checkPermission={false} {...props} />
      )}
    </>
  );
}

export default memo(FuseNavigation);
