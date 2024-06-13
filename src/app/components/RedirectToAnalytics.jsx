import { Navigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const RedirectToAnalytics = observer(() => (
  // <Navigate to="signin" />
  <Navigate to="/signin" />
));

export default RedirectToAnalytics;
