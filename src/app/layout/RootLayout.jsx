import { observer } from "mobx-react-lite";
import { useSettings } from "../hooks/store/use-settings";
import { useMemo } from "react";
import { useAuth } from "../hooks/store/use-auth";

const RootLayout = observer(({ children, layouts }) => {
  const settings = useSettings();
  const Layout = layouts[settings.layout];
  return <Layout>{children}</Layout>;
});

export default RootLayout;
