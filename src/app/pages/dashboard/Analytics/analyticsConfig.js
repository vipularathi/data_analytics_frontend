import { createRoute } from "@tanstack/react-router";
import { dashboardRoute } from "../dashboardConfig";
import Analytics from "./Analytics";

/** Routing for Analytics */
export const analyticsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/analytics",
  component: Analytics,
});
