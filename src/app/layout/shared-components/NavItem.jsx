import { ListItemButton, ListItemText, alpha, styled } from "@mui/material";
import { Link, useRouterState } from "@tanstack/react-router";
import clsx from "clsx";
import { observer } from "mobx-react-lite";

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
        ? "#dbe4f3!important"
        : "#5a8dee!important",
    pointerEvents: "none",
    transition: "border-radius .15s cubic-bezier(0.4,0.0,0.2,1)",
    "& > .fuse-list-item-text-primary": {},
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

const NavItem = observer(({ item }) => {
  const routerState = useRouterState();

  return (
    <Link to={item.url} className="flex justify-center px-6">
      <Root
        className={clsx(
          "fuse-list-item",
          routerState.location.pathname === item.url && "active",
        )}
      >
        <item.icon fontSize="small" className="fuse-list-item-icon" />
        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
          classes={{
            primary: "fuse-list-item-text-primary",
          }}
        />
      </Root>
    </Link>
  );
});

export default NavItem;
