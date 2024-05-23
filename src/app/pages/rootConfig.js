import { createRootRouteWithContext } from "@tanstack/react-router";
import RootComponent from "./RootComponent";
import NotFound from "./not-found/NotFound";
import Loading from "../components/Loading";

/** Root Router with RootComponent and added Not found component if route not find */
export const rootRoute = createRootRouteWithContext()({
  component: RootComponent,
  notFoundComponent: NotFound,
  pendingComponent: Loading,
});
