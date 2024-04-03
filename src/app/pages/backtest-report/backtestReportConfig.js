import { createRoute } from "@tanstack/react-router";
import { backtestRoute } from "../backtest/backtestConfig";
import BacktestReport from "./BacktestReport";

/** Routing for Backtest Report */
export const backtestReportRoute = createRoute({
    getParentRoute: () => backtestRoute,
    path: "$backtestId",
    component: BacktestReport,
});
