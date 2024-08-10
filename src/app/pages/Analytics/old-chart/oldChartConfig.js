import { createRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { analyticsRoute } from "../analyticsConfig";
import { chartApiOld } from "../../../services/oldchart.service.js";


import OldChart from "./OldChart";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApiOld.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const oldChartRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "analytics/old-chart",
  component: OldChart,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(symbolQueryOption),
});
