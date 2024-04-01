import { createRouter } from "@tanstack/react-router";
import { dasboardRoute } from "./app/main/dashboard/dashboardConfig";
import { signInRoute } from "./app/main/sign-in/signinConfig";
import { signUpRoute } from "./app/main/sign-up/signupConfig";
import { rootRoute } from "./app/main/rootConfig";
import { userStore } from "./app/store/user";

/*
 * Define the router Tree for adding children based on pages
 */
const routeTree = rootRoute.addChildren([
  dasboardRoute,
  signInRoute,
  signUpRoute,
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
