import { createRootRoute } from "@tanstack/react-router";
import App from "./App";
import NotFound from "./app/main/not-found/NotFound";

export const rootRoute = createRootRoute({
  component: App,
  notFoundComponent: NotFound,
});
