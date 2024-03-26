import { createRoute } from "@tanstack/react-router";
import SignUpPage from "./SignUpPage";
import { rootRoute } from "../../../../appConfig";

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});
