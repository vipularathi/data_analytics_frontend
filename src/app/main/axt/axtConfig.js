import { createRoute, redirect } from "@tanstack/react-router";
import { dasboardRoute } from "../dashboard/dashboardConfig";
import Axt from "./AXT";

/** Routing for Dashboard */
export const axtRoute = createRoute({
    getParentRoute: () => dasboardRoute,
    path: "/axt",
    component: Axt,

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
        console.log("axtRoute")
    },
});
