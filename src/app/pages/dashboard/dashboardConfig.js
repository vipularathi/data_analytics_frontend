import { createRoute } from "@tanstack/react-router";
import Dashboard from "./Dashboard";
import { rootRoute } from "../rootConfig";

/** Routing for Dashboard */
export const dasboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});
