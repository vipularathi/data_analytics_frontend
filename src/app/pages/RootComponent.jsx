import { Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const RootComponent = observer(() => (
  // This is where child routes will render
  // https://tanstack.com/router/latest/docs/framework/react/guide/outlets
  <Outlet />
));

export default RootComponent;
