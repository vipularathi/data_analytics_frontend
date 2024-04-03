import { createRoute } from "@tanstack/react-router";
import SignInPage from "./SignIn";
import { rootRoute } from "../rootConfig";

/** Routing for SingInPage */
export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignInPage,
});
