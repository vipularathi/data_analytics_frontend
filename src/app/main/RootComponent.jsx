import { Link, Outlet } from "@tanstack/react-router";
import React from "react";
import { rootRoute } from "./rootConfig";
import { observer } from "mobx-react-lite";

const RootComponent = observer(() => {
  const { user, isAuthenticated } = rootRoute.useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {user.isAuthenticated ? (
          <Link
            to={"/dashboard"}
            activeProps={{
              className: "font-bold",
            }}
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              to={"/signin"}
              activeProps={{
                className: "font-bold",
              }}
              search={{ redirect: "/" }}
            >
              Login
            </Link>

            <Link
              to={"/signup"}
              activeProps={{
                className: "font-bold",
              }}
              search={{ redirect: "/" }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
      <hr />
      <Outlet />
    </>
  );
});

export default RootComponent;
