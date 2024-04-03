import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user.store";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const ForgetPassword = observer(() => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    userStore.resetPassword({ email, purpose: "pwd_reset" });
  };

  const handleSetNewPassword = (e) => {
    e.preventDefault();
    userStore.setNewPassword({ otp, password: newPassword }).then(() => {
      navigate({ to: "/signin" });
    });
  };

  return (
    <div>
      ForgetPassword
      {!userStore.showCreatePW ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">
            {userStore.isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSetNewPassword}>
          <label htmlFor="newPW">New Password:</label>
          <br />
          <input
            id="newPW"
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <label htmlFor="otp">OTP</label>
          <br />
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button>{userStore.isLoading ? "Loading..." : "submit"}</button>
        </form>
      )}
    </div>
  );
});

export default ForgetPassword;
