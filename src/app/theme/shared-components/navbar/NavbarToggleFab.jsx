import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import LucideIcon from "../../../components/LucideIcon";

const Root = styled(Tooltip)(({ theme, position }) => ({
  "& > .button": {
    height: 40,
    position: "absolute",
    zIndex: 99,
    top: 12,
    width: 24,
    borderRadius: 38,
    padding: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(
      ["background-color", "border-radius", "width", "min-width", "padding"],
      {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
      },
    ),
    "&:hover": {
      width: 52,
      paddingLeft: 8,
      paddingRight: 8,
    },
    "& > .button-icon": {
      fontSize: 18,
      transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.short,
      }),
    },
    ...(position === "left" && {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      paddingLeft: 4,
      left: 0,
    }),
    ...(position === "right" && {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      paddingRight: 4,
      right: 0,
      "& > .button-icon": {
        transform: "rotate(-180deg)",
      },
    }),
  },
}));

/**
 * The NavbarToggleFab component.
 */
function NavbarToggleFab(props) {
  const { className = "", position = "left", onClick } = props;
  return (
    <Root
      title="Show Navigation"
      placement={position === "left" ? "right" : "left"}
      position={position}
    >
      <Fab
        className={clsx("button", className)}
        onClick={onClick}
        disableRipple
      >
        <LucideIcon name="align-justify" className="button-icon" />
      </Fab>
    </Root>
  );
}

NavbarToggleFab.defaultProps = {};
export default NavbarToggleFab;
