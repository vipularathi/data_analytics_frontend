import { createRoute } from "@tanstack/react-router";
import Dashboard from "./Dashboard";
import { rootRoute } from "../../../appConfig";


export const dasboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});
