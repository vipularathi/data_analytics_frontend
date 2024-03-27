import { createRoute, redirect } from "@tanstack/react-router";
import Dashboard from "./Dashboard";
import { rootRoute } from "../rootConfig";

/** Routing for Dashboard */
export const dasboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
  beforeLoad: ({ context, location }) => {
    // check if user is Authenticated otherwise  redirect to login page
    if (!context.userStore.isAuthenticated) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
