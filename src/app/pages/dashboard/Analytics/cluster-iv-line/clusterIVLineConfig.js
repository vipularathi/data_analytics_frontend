import { createRoute } from "@tanstack/react-router";
import { analyticsRoute } from "../analyticsConfig";
import ClusterIVLine from "./ClusterIVLine";

export const clusterIVLineRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/cluster-iv-line",
  component: ClusterIVLine,
});
