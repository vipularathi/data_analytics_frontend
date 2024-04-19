import { createRoute } from "@tanstack/react-router";
import ClusterIV from "./ClusterIV";
import { analyticsRoute } from "../analyticsConfig";
import { queryOptions } from "@tanstack/react-query";
import { chartApi } from "../../../../services/chart.service";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApi.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const clusterIVRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/cluster-iv",
  component: ClusterIV,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(symbolQueryOption);
  },
});
