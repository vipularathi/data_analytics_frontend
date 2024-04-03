import { createRootRouteWithContext } from "@tanstack/react-router";
import RootComponent from "./RootComponent";
import NotFound from "./not-found/NotFound";

/** Root Router with RootComponent and added Not found component if route not find */
export const rootRoute = createRootRouteWithContext()({
  component: RootComponent,
  notFoundComponent: NotFound,
});
