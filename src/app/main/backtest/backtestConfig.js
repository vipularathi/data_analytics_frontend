import { createRoute, redirect } from "@tanstack/react-router";
import Backtest from "./Backtest";
import { dasboardRoute } from "../dashboard/dashboardConfig";

/** Routing for Dashboard */
export const backtestRoute = createRoute({
    getParentRoute: () => dasboardRoute,
    path: "/backtest",
    component: Backtest,

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
        console.log("backtestRoute")
    },
});
