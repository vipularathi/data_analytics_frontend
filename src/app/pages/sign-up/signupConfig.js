import { createRoute } from "@tanstack/react-router";
import SignUpPage from "./SignUp";
import { rootRoute } from "../rootConfig";

/** Routing for SingUpPage */
export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});
