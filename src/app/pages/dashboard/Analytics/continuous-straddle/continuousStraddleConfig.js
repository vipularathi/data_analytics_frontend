import { createRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import ContinuousStraddle from "./ContinuousStraddle";
import { analyticsRoute } from "../analyticsConfig";
import { chartApi } from "../../../../services/chart.service";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApi.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const continuousStraddleRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/conti-straddle-minima",
  component: ContinuousStraddle,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(symbolQueryOption),
});
