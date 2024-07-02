// eslint-disable-next-line import/no-unresolved
import FuseScrollbars from "@core/core/FuseScrollbars";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import { memo } from "react";
import { observer } from "mobx-react-lite";
import Navigation from "../../../../shared-components/navigation/Navigation";
import NavbarToggleButton from "../../../../shared-components/navbar/NavbarToggleButton";
import Logo from "../../../../shared-components/Logo";
import { useNavbar } from "../../../../../hooks/store/use-navbar";

const Root = styled("div")(({ theme, foldedandclosed }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.24)" : "rgba(255, 255, 255, 0.24)"}`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.37)" : "rgba(255, 255, 255, 0.37)"}`,
  },
  ...(foldedandclosed && {
    borderRight: "1px solid",
    borderRightColor: theme.palette.chart.borderColor,
  }),
}));
const StyledContent = styled(FuseScrollbars)(() => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  background:
    "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
}));

/**
 * The navbar style 2 content.
 */
const NavbarStyle2Content = observer((props) => {
  const { className = "" } = props;
  const navbar = useNavbar();
  const foldedandclosed = navbar.folded && !navbar.foldedOpen;
  return (
    <Root
      foldedandclosed={foldedandclosed}
      className={clsx(
        "flex h-full flex-auto flex-col overflow-hidden",
        className,
      )}
    >
      <div className="flex h-48 shrink-0 flex-row items-center px-12 md:h-64">
        <div className="mx-6 flex flex-1">
          <Logo />
        </div>
        {navbar.foldedOpen && <NavbarToggleButton className="h-40 w-40 p-0" />}
      </div>

      <StyledContent
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <Navigation layout="vertical" />
      </StyledContent>
    </Root>
  );
});

export default memo(NavbarStyle2Content);
