import { styled } from "@mui/material";
import { observer } from "mobx-react-lite";

const Root = styled("div")(({ theme }) => ({
  "& > .logo-icon": {
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));
const Logo = observer(({ src, foldedandopened }) => (
  <Root className="flex items-center">
    <img
      className={`logo-icon  h-28 ${foldedandopened && " h-28"}`}
      src={src}
      alt="logo"
    />
  </Root>
));

export default Logo;
