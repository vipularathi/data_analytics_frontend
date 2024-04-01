import {
  useNavigate,
  useRouteContext,
} from "@tanstack/react-router";
import { useState } from "react";
import { observer } from "mobx-react-lite";

const SignInPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  /*
   * accessing the userStore with Router Context
   */
  const { user } = useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    user
      .signIn({ provider: "email", email, password })
      .then(() => {
        console.log("Successfully login");
        navigate({ to: "/dashboard" }); // redirect if login successful
      })
      .catch(() => {});
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
              type="email"
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
});

export default SignInPage;
