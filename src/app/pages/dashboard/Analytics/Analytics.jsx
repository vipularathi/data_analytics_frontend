/* eslint-disable no-nested-ternary */
import { Outlet, useNavigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/store/use-auth";
import { useUser } from "../../../hooks/store/use-user";
import RootLayout from "../../../layout/RootLayout";
import LayoutList from '../../../layout/LayoutList'

const Analytics = observer(() => {
  const authStore = useAuth();
  const userStore = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    authStore.verifyToken().catch(() => {
      navigate({ to: "/signin" });
    });
  }, [authStore, navigate]);
  const handleLogout = () => {
    authStore.signOut().then(() => {
      navigate({ to: "/signin" });
    });
  };
  return (
    <RootLayout layouts={LayoutList}>
      {authStore.verifyingToken ? (
        <p>Loading...</p>
      ) : authStore.isAuthenticated && !authStore.verifyingToken ? (
        <>
          <h3>Dashboard page</h3>
          <p>
            Hi,
            <b>{userStore.user?.displayName}</b>!
          </p>
          <p>If you can see this, that means you are authenticated.</p>
          <div className="mt-4">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Outlet />
        </>
      ) : null}
    </RootLayout>
  );
});
export default Analytics;
