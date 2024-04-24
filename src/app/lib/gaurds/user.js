import { redirect } from "@tanstack/react-router";
import { PAGEAUTH } from "../../constants/page-auth";
import { ROLES } from "../../constants/roles";

// User role and authentication check

export async function userGaurd(args, { redirectUrl }) {
  const {
    context: { store },
  } = args;
  if (store.auth.isAuthenticated && PAGEAUTH.user.includes(store.user.userRole)) return;
  const data = await store.auth.verifyToken();
  // If role none the redirect to defined path or signin
  if (ROLES.none.includes(data.role)) {
    await store.auth.signOut();
    throw redirect({
      to: redirectUrl || "/signin",
    });
  }
  // If role is admin then redirect as per you route
  if (ROLES.admin.includes(data.role)) {
    throw redirect({
      to: "/admin",
    });
  }
}
