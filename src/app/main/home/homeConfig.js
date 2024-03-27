import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootConfig";
import Home from "./Home";

/** Routing for Home */
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
