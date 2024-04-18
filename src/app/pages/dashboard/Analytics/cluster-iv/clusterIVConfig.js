import { createRoute } from "@tanstack/react-router";
import ClusterIV from "./ClusterIV";
import { analyticsRoute } from "../analyticsConfig";

export const clusterIVRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/cluster-iv",
  component: ClusterIV,
});
