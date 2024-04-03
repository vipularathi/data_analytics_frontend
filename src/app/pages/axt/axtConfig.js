import { createRoute } from "@tanstack/react-router";
import { dasboardRoute } from "../dashboard/dashboardConfig";
import Axt from "./AXT";

/** Routing for Dashboard */
export const axtRoute = createRoute({
  getParentRoute: () => dasboardRoute,
  path: "/axt",
  component: Axt,
});
