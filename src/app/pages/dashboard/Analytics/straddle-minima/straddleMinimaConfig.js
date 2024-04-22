import { createRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import StraddleMinima from "./StraddleMinima";
import { analyticsRoute } from "../analyticsConfig";
import { chartApi } from "../../../../services/chart.service";

const symbolQueryOption = queryOptions({
  queryKey: ["symbol"],
  queryFn: () => chartApi.getSymbols().then((res) => res.data),
  staleTime: Infinity,
});

export const straddleMinRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/straddle-minima",
  component: StraddleMinima,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(symbolQueryOption),
});
