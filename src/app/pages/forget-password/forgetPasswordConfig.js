import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootConfig";
import ForgetPassword from "./ForgetPassword";

/** Routing for ForgetPage */
export const forgetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "forget-password",
  component: ForgetPassword,
});
