import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./appConfig";
import { dasboardRoute } from "./app/main/dashboard/dashboardConfig";
import { signInRoute } from "./app/main/accounts/sign-in/signinConfig";
import { signUpRoute } from "./app/main/accounts/sign-up/signupConfig";

const routeTree = rootRoute.addChildren([
  dasboardRoute,
  signInRoute,
  signUpRoute,
]);

export const router = createRouter({ routeTree });
