import { Navigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const RedirectToAnalytics = observer(() => (
  <Navigate to="analytics/straddle-minima" />
));

export default RedirectToAnalytics;
