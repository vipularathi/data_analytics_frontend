// eslint-disable-next-line import/no-unresolved
import NavLinkAdapter from "@core/core/NavLinkAdapter";
import { alpha, styled } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import clsx from "clsx";
import { useMemo } from "react";
import { ListItemButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import FuseNavBadge from "../../FuseNavBadge";
import LucideIcon from "../../../../../app/components/LucideIcon";

const Root = styled(ListItemButton)(({ theme, ...props }) => ({
  minHeight: 44,
  width: "100%",
  borderRadius: "6px",
  margin: "0 0 4px 0",
  paddingRight: 16,
  paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
  paddingTop: 10,
  paddingBottom: 10,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: "pointer",
  textDecoration: "none!important",
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.active,
    pointerEvents: "none",
    transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
    "& > .fuse-list-item-text-primary": {
      color: "inherit",
    },
    "& > .fuse-list-item-icon": {
      color: "inherit",
    },
  },
  "& >.fuse-list-item-icon": {
    marginRight: 16,
    color: "inherit",
  },
  "& > .fuse-list-item-text": {},
}));

/**
 * FuseNavVerticalItem is a React component used to render FuseNavItem
 * as part of the Fuse navigational component.
 */
const FuseNavVerticalItem = observer((props) => {
  const { item, nestedLevel = 0, onItemClick } = props;
  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;
  const component = item.url ? NavLinkAdapter : "li";
  let itemProps = {};
  if (typeof component !== "string") {
    itemProps = {
      disabled: item.disabled,
      to: item.url || "",
      end: item.end,
      role: "button",
    };
  }
  return useMemo(
    () => (
      <Root
        component={component}
        className={clsx("fuse-list-item")}
        onClick={() => onItemClick && onItemClick(item)}
        itempadding={itempadding}
        sx={item.sx}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...itemProps}
      >
        {item?.icon && (
          <LucideIcon
            name={item.icon}
            className={clsx("fuse-list-item-icon shrink-0", item.iconClass)}
          />
        )}

        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          secondary={item?.subtitle}
          classes={{
            primary: "text-14 font-medium fuse-list-item-text-primary truncate",
            secondary:
              "text-11 font-medium fuse-list-item-text-secondary leading-normal truncate",
          }}
        />
        {item.badge && <FuseNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick],
  );
});

const NavVerticalItem = FuseNavVerticalItem;
export default NavVerticalItem;
