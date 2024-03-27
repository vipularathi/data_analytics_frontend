import {
  Navigate,
  getRouteApi,
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import React, { useState } from "react";
import { signInRoute } from "./signinConfig";

const routeApi = getRouteApi("/signin");
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /*
   * accessing the userStore with Router Context
   */
  const { user, isAuthenticated } = signInRoute.useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  const search = routeApi.useSearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    user.setTempUser(email);
    navigate({ to: search.redirect }); // redirect if login successful
  };

  return (
    <div>
      <h3>Login page</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="username-input">Email</label>
            <input
              id="username-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isSubmitting ? "Loading..." : "Login"}</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;
