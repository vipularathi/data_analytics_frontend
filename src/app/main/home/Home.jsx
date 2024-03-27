import { Link } from "@tanstack/react-router";
import React from "react";
import { homeRoute } from "./homeConfig";

const Home = () => {
  const { user, isAuthenticated } = homeRoute.useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });
  
  return (
    <div>
      <h3>Welcome Home!</h3>
      <p>
        <Link to="/dashboard" className="font-semibold">
          {isAuthenticated ? "Go" : "Try going"} to the dashboard page
        </Link>
      </p>
    </div>
  );
};

export default Home;
