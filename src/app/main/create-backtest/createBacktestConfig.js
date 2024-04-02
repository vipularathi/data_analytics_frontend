import { createRoute, redirect } from "@tanstack/react-router";
import { dasboardRoute } from "../dashboard/dashboardConfig";
import CreateBacktest from "./CreateBacktest";

/** Routing for Dashboard */
export const createBacktestRoute = createRoute({
    getParentRoute: () => dasboardRoute,
    path: "/create",
    component: CreateBacktest,

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
        console.log("createBacktestConfig")
    },
});
