import { createRouter } from "@tanstack/react-router";
import { dasboardRoute } from "./app/pages/dashboard/dashboardConfig";
import { signInRoute } from "./app/pages/sign-in/signinConfig";
import { signUpRoute } from "./app/pages/sign-up/signupConfig";
import { rootRoute } from "./app/pages/rootConfig";
import { forgetPasswordRoute } from "./app/pages/forget-password/forgetPasswordConfig";

/*
 * Define the router Tree for adding children based on pages
 */
const routeTree = rootRoute.addChildren([
  dasboardRoute,
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
