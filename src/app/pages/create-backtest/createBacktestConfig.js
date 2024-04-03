import { createRoute } from "@tanstack/react-router";
import { dasboardRoute } from "../dashboard/dashboardConfig";
import CreateBacktest from "./CreateBacktest";

/** Routing for Create Backtest */
export const createBacktestRoute = createRoute({
  getParentRoute: () => dasboardRoute,
  path: "/create",
  component: CreateBacktest,
});
