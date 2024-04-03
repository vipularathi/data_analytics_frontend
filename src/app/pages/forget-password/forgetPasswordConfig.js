import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootConfig";
import ForgetPassword from "./ForgetPassword";

export const forgetPasswordRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "forget-password",
    component: ForgetPassword,
});