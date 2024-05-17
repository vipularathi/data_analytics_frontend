import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "../../hooks/store/use-auth";
import { authApi } from "../../services/auth.service";

const SignInPage = observer(() => {
  const authStore = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(null);
    const res = await authApi.signIn(email, password);
    console.log(res);

    if (res.output === "login success") {
      setMessage(false);
      navigate({ to: "/analytics/custom-chart" });
    } else {
      setMessage(true);
      navigate({ to: "/signin" });
    }
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
          {message ? <p style={{ color: "red" }}>Check credentials</p> : <> </>}
          {/* <p>{errMsg}</p> */}
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
