import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useUser } from "../../hooks/store/use-user";

const SignInPage = observer(() => {
  const userStore = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
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

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    userStore.verifyOtp({ otp }).then(() => {
      userStore.showOtp = false;
      navigate({ to: "/signin" });
    });
  };
  return (
    <div>
      <h3>Login page</h3>
      <Link to="/signup">Sign Up</Link>
      <Link to="/forget-password">Forget Password</Link>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="username-input">
              Email
              <input
                id="username-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">
            {userStore.isLoading ? "Loading..." : "Login"}
          </button>
        </fieldset>
      </form>

      {userStore.showOtp && (
        <form onSubmit={handleOtpSubmit}>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="otp">
              OTP
              <input
                id="otp"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">
            {userStore.isLoading ? "Loading..." : "verify"}
          </button>
        </form>
      )}
    </div>
  );
});

export default SignInPage;
