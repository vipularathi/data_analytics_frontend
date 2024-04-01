import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useRouteContext } from "@tanstack/react-router";

const SignUpPage = observer(() => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting] = useState(false);

  const { user } = useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    user.signUp({
      provider: "email",
      fullname: name,
      email: email,
      password: password,
      provider_token: "string",
    });
  };

  return (
    <div>
      <h3>Sign page</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
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
          <button type="submit">
            {isSubmitting ? "Loading..." : "Sign Up"}
          </button>
        </fieldset>
      </form>
    </div>
  );
});

export default SignUpPage;
