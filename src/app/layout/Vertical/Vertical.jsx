import { observer } from "mobx-react-lite";
import { useSettings } from "../../hooks/store/use-settings";
import { styled } from "@mui/material";
import NavbarVertical from "./NavbarVertical";

const Root = styled("div")(({ config }) => ({
  ...(config.mode === "boxed" && {
    clipPath: "inset(0)",
    maxWidth: `1570px`,
    margin: "0 auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `1570px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}));

const Vertical = observer(({ children }) => {
  const settings = useSettings();
  return (
    <Root config={settings} className="flex w-full">
      <NavbarVertical />
      {children}
    </Root>
  );
});

export default Vertical;
