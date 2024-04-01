import {
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user";

const SignInPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    userStore.isLoading = true;

    userStore
      .signIn({ provider: "email", email, password })
      .then(() => {
        userStore.isLoading = false;
        navigate({ to: "/" });
      })
      .catch(() => {
        userStore.isLoading = false;
      });
  };

  return (
    <div>
      <h3>Login page</h3>
      <Link to="/signup">Sign Up</Link>
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
          <button type="submit">{userStore.isLoading ? "Loading..." : "Login"}</button>
        </fieldset>
      </form>
    </div>
  );
});

export default SignInPage;
