import { createRoute } from "@tanstack/react-router";
import { analyticsRoute } from "../analyticsConfig";
import ClusterIVLine from "./ClusterIVLine";
import { queryOptions } from "@tanstack/react-query";
import { chartApi } from "../../../../services/chart.service";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApi.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const clusterIVLineRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/cluster-iv-line",
  component: ClusterIVLine,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(symbolQueryOption);
  },
});
