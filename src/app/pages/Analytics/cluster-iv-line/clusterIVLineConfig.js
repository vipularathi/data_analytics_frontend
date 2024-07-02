import { createRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { analyticsRoute } from "../analyticsConfig";
import ClusterIVLine from "./ClusterIVLine";
import { chartApi } from "../../../services/chart.service";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApi.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const clusterIVLineRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "analytics/cluster-iv-line",
  component: ClusterIVLine,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(symbolQueryOption),
});
