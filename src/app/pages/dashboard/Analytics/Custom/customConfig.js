import { createRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { analyticsRoute } from "../analyticsConfig";
import { chartApi } from "../../../../services/chart.service";
import CustomChart from "./CustomChart";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApi.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const customChartRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/custom-chart",
  component: CustomChart,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(symbolQueryOption),
});
