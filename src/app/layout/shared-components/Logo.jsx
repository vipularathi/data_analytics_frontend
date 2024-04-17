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
const Logo = observer(() => {
  return (
    <Root className="flex items-center">
      <img
        className="logo-icon h-32 w-32"
        src="src/assets/logo/finzome-logo-icon.png"
        alt="logo"
      />
    </Root>
  );
});

export default Logo;
