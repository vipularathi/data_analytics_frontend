import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/store/use-auth";

const SignUpPage = observer(() => {
  const authStore = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => () => {
    authStore.showOtp = false;
  }, [authStore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    authStore
      .createUser({
        provider: "email",
        fullname: name,
        email,
        password,
        provider_token: "string",
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    authStore.verifyOtp({ otp }).then(() => {
      navigate({ to: "/signin" });
    });
  };
  return (
    <div>
      <h3>Sign Up</h3>
      <Link to="/signin">Sign in</Link>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="name">
              Name
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div style={{ padding: 10, display: "flex", gap: 10 }}>
            <label htmlFor="email">
              Email
              <input
                id="email"
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
            {authStore.isLoading ? "Loading..." : "Sign Up"}
          </button>
          <p>
            {errMsg}
          </p>
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
        </form>
      )}
    </div>
  );
});

export default SignUpPage;
