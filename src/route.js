import { createRouter } from "@tanstack/react-router";
import { dasboardRoute } from "./app/main/dashboard/dashboardConfig";
import { signInRoute } from "./app/main/sign-in/signinConfig";
import { signUpRoute } from "./app/main/sign-up/signupConfig";
import { rootRoute } from "./app/main/rootConfig";
import { homeRoute } from "./app/main/home/homeConfig";
import { UserStore } from "./app/store/user-store";

/*
 * Initaite the userStore to provide context in Router context
 */
const userStore = new UserStore();
/*
 * Define the router Tree for adding children based on pages
 */
const routeTree = rootRoute.addChildren([
  dasboardRoute,
  signInRoute,
  signUpRoute,
  homeRoute,
]);

/*
 * this router is provided to RouterProvider
 */
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    userStore: userStore, // This will be set after we wrap the app in an AuthProvider
  },
});
