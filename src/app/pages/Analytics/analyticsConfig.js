import { createRoute } from "@tanstack/react-router";
import Analytics from "./Analytics";
import { rootRoute } from "../rootConfig";

/** Routing for Analytics */
export const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "analytics",
  component: Analytics,
});
