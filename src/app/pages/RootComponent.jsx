import { Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const RootComponent = observer(() => (
  <Outlet />
));

export default RootComponent;
