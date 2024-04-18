import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootConfig";
import RedirectToAnalytics from "../../components/RedirectToAnalytics";

/** Routing for Analytics */
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RedirectToAnalytics,
});
