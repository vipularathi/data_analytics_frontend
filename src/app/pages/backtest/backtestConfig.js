import { createRoute } from "@tanstack/react-router";
import Backtest from "./Backtest";
import { dasboardRoute } from "../dashboard/dashboardConfig";

/** Routing for Backtest Index */
export const backtestRoute = createRoute({
  getParentRoute: () => dasboardRoute,
  path: "/backtest",
  component: Backtest,
});
