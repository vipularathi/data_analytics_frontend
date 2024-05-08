import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "../../hooks/store/use-auth";

const SignInPage = observer(() => {
  const authStore = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(null);
    authStore
      .signIn({ provider: "email", email, password })
      .then((resp) => {
        if ("token" in resp) {
          navigate({ to: "/dashboard" });
        }
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    authStore
      .verifyOtp({ otp })
      .then((resp) => {
        if ("token" in resp) {
          navigate({ to: "/admin" });
        }
      })
      .catch((error) => {
        setErrMsg(error.message);
      })
      .finally(() => {
        setOtp("");
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
            {authStore.isLoading ? "Loading..." : "Login"}
          </button>
          <p>{errMsg}</p>
        </fieldset>
      </form>

      {authStore.showOtp && (
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
            {authStore.isLoading ? "Loading..." : "verify"}
          </button>
          <p>{errMsg}</p>
        </form>
      )}
    </div>
  );
});

export default SignInPage;
