import { Navigate, Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const RedirectToAnalytics = observer(() => (
  <>
    <Navigate to="/analytics/custom-chart" />
    <Outlet />
  </>
));

export default RedirectToAnalytics;
