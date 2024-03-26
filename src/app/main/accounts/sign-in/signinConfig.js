import { createRoute } from "@tanstack/react-router";
import SignInPage from "./SignInPage";
import { rootRoute } from "../../../../appConfig";

export const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignInPage,
});
