import React, { useContext } from "react";
import { dasboardRoute } from "./dashboardConfig";
import { useNavigate } from "@tanstack/react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = dasboardRoute.useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  const handleLogout = () => {
    user.resetTempUser();
    navigate({ to: "/" });
  };

  return (
    <div>
      <h3>Dashboard page</h3>
      <p>
        Hi<b> {user.user}</b>!
      </p>
      <p>If you can see this, that means you are authenticated.</p>
      <div className="mt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-slate-500 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
