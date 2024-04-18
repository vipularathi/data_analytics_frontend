import { ListItemButton, ListItemText, alpha, styled } from "@mui/material";
import clsx from "clsx";

const Root = styled(ListItemButton)(({ theme }) => ({
  minHeight: 44,
  width: "100%",
  borderRadius: "6px",
  margin: "0 0 4px 0",
  paddingRight: 16,
  paddingLeft: 16,
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
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, .05)!important"
        : "rgba(255, 255, 255, .1)!important",
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
const NavItem = (props) => {
  const { item, onItemClick } = props;
  return (
    <Root
      className={clsx("fuse-list-item", item.active && "active")}
      onClick={() => onItemClick && onItemClick(item)}
    >
      
      <ListItemText
        className="fuse-list-item-text"
        primary={item.title}
        classes={{
          primary: "text-13 font-medium fuse-list-item-text-primary truncate",
        }}
      />
    </Root>
  );
};

export default NavItem;
