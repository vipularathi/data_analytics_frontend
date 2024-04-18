import { createRouter } from "@tanstack/react-router";
import { analyticsRoute } from "./app/pages/dashboard/Analytics/analyticsConfig";
import { signInRoute } from "./app/pages/sign-in/signinConfig";
import { signUpRoute } from "./app/pages/sign-up/signupConfig";
import { rootRoute } from "./app/pages/rootConfig";
import { forgetPasswordRoute } from "./app/pages/forget-password/forgetPasswordConfig";
import { clusterIVRoute } from "./app/pages/dashboard/Analytics/cluster-iv/clusterIVConfig";
import { clusterIVLineRoute } from "./app/pages/dashboard/Analytics/cluster-iv-line/clusterIVLineConfig";
import { continuousStraddleRoute } from "./app/pages/dashboard/Analytics/continuous-straddle/continuousStraddleConfig";
import { straddleMinRoute } from "./app/pages/dashboard/Analytics/straddle-minima/straddleMinimaConfig";
import { dashboardRoute } from "./app/pages/dashboard/dashboardConfig";

/*
 * Define the router Tree for adding children based on pages
 */
const routeTree = rootRoute.addChildren([
  dashboardRoute.addChildren([
    analyticsRoute.addChildren([
      clusterIVRoute,
      clusterIVLineRoute,
      continuousStraddleRoute,
      straddleMinRoute,
    ]),
  ]),
  signInRoute,
  signUpRoute,
  forgetPasswordRoute,
]);

/*
 * this router is provided to RouterProvider
 */
export const router = createRouter({
  routeTree,
  defaultPreload: false,
});
