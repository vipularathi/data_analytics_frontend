import { Navigate, Outlet } from "@tanstack/react-router";
import React from "react";

const RedirectToAnalytics = () => {
  return (
    <>
      <Navigate to="/analytics/straddle-minima" />
      <Outlet />
    </>
  );
};

export default RedirectToAnalytics;
