import { createRoute } from "@tanstack/react-router";
import SignInPage from "./SignInPage";
import { rootRoute } from "../../rootConfig";

/** Routing for SingInPage */
export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignInPage,
});
