import React, { useContext } from "react";
import { dasboardRoute } from "./dashboardConfig";
import { useNavigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const Dashboard = observer(() => {
  const navigate = useNavigate();
  const { user } = dasboardRoute.useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  const handleLogout = () => {
    user
      .signOut()
      .then(() => {
        console.log("successfully Sign Out");
      })
      .catch(() => {
        console.log("Error in Sign Out");
      });
    navigate({ to: "/" });
  };

  return (
    <div>
      <h3>Dashboard page</h3>
      <p>
        Hi <b>{user.user?.displayName}</b>!
      </p>
      <p>If you can see this, that means you are authenticated.</p>
      <div className="mt-4">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
});
export default Dashboard;
