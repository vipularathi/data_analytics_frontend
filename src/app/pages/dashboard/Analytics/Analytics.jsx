/* eslint-disable no-nested-ternary */
import { Outlet, useNavigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/store/use-auth";
import RootLayout from "../../../layout/RootLayout";
import LayoutList from "../../../layout/LayoutList";

const Analytics = observer(() => {
  const authStore = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authStore.verifyToken().catch(() => {
      navigate({ to: "/signin" });
    });
  }, [authStore, navigate]);
  return (
    <RootLayout layouts={LayoutList}>
      <Outlet />
    </RootLayout>
  );
});
export default Analytics;
