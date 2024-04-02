import { createRouter } from "@tanstack/react-router";
import { dasboardRoute } from "./app/main/dashboard/dashboardConfig";
import { signInRoute } from "./app/main/sign-in/signinConfig";
import { signUpRoute } from "./app/main/sign-up/signupConfig";
import { rootRoute } from "./app/main/rootConfig";
import { userStore } from "./app/store/user";
import { backtestRoute } from "./app/main/backtest/backtestConfig";
import { axtRoute } from "./app/main/axt/axtConfig";
import { createBacktestRoute } from "./app/main/create-backtest/createBacktestConfig";
import { backtestReportRoute } from "./app/main/backtest-report/backtestReportConfig";
import { forgetPasswordRoute } from "./app/main/forget-password/forgetPasswordConfig";

/*
 * Define the router Tree for adding children based on pages
 */
const routeTree = rootRoute.addChildren([
  dasboardRoute.addChildren([backtestRoute, backtestReportRoute, axtRoute, createBacktestRoute]),
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
  context: {
    userStore: userStore, // This will be set after we wrap the app in an AuthProvider
  },
});
