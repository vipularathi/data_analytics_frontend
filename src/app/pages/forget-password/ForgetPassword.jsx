import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/store/use-auth";

const ForgetPassword = observer(() => {
  const authStore = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    authStore.resetPassword({ email, purpose: "pwd_reset" }).catch((error) => {
      setErrMsg(error.message);
    });
  };

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    authStore.setNewPassword({ otp, password: newPassword })
      .then(() => {
        navigate({ to: "/signin" });
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  };

  return (
    <div>
      ForgetPassword
      {!authStore.showCreatePW ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">
            {authStore.isLoading ? "Loading..." : "Submit"}
          </button>
          <p>
            {errMsg}
          </p>
        </form>
      ) : (
        <form onSubmit={handleSetNewPassword}>
          <label htmlFor="newPW">
            New Password:
            <input
              id="newPW"
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <br />

          <br />
          <label htmlFor="otp">
            OTP
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">{authStore.isLoading ? "Loading..." : "submit"}</button>
          <p>
            {errMsg}
          </p>
        </form>
      )}
    </div>
  );
});

export default ForgetPassword;
