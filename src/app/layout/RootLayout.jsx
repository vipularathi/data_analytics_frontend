import { observer } from "mobx-react-lite";
import settingsConfig from "../config/settingConfig";

const RootLayout = observer(({ children, layouts }) => {
  const Layout = layouts[settingsConfig.layout];
  return <Layout>{children}</Layout>;
});

export default RootLayout;
