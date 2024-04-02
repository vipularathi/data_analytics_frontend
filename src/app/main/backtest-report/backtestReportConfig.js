import { createRoute, redirect } from "@tanstack/react-router";
import { backtestRoute } from "../backtest/backtestConfig";
import BacktestReport from "./BacktestReport";

/** Routing for Dashboard */
export const backtestReportRoute = createRoute({
    getParentRoute: () => backtestRoute,
    path: "$backtestId",
    component: BacktestReport,
    beforeLoad: ({ context, location }) => {
        // check if user is Authenticated otherwise redirect to login page
        // if (!context.userStore.isAuthenticated) {
        //     throw redirect({
        //         to: "/signin",
        //         search: {
        //             redirect: location.href,
        //         },
        //     });
        // }
        console.log("backtestReportRoute")
    },
});
