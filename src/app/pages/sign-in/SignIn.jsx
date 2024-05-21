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
 
//still to test
// import { Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { observer } from "mobx-react-lite";
// import { useAuth } from "../../hooks/store/use-auth";
 
// const SignInPage = observer(() => {
//   const authStore = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [errMsg, setErrMsg] = useState(null);
//   const navigate = useNavigate();
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrMsg(null);
//     authStore
//       .signIn({ provider: "email", email, password })
//       .then((resp) => {
//         if ("token" in resp) {
//           navigate({ to: "/dashboard" });
//         }
//       })
//       .catch((error) => {
//         setErrMsg(error.message);
//       });
//   };
 
//   const handleOtpSubmit = (e) => {
//     e.preventDefault();
//     authStore
//       .verifyOtp({ otp })
//       .then((resp) => {
//         if ("token" in resp) {
//           navigate({ to: "/admin" });
//         }
//       })
//       .catch((error) => {
//         setErrMsg(error.message);
//       })
//       .finally(() => {
//         setOtp("");
//       });
//   };
 
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',marginLeft:"40%"}}>
//       <div style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//         <h3>Login page</h3>
//         {/* <Link to="/signup">Sign Up</Link>
//         <Link to="/forget-password">Forget Password</Link> */}
//         <form onSubmit={handleSubmit}>
//           <fieldset>
//             <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
//               <label htmlFor="username-input">
//                 Email
//                 <input
//                   id="username-input"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </label>
//               <label htmlFor="password">
//                 Password
//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </label>
//             </div>
//             <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 0', cursor: 'pointer' }}>
//               {authStore.isLoading ? "Loading..." : "Login"}
//             </button>
//             <p style={{ textAlign: "center", color: "red" }}>{errMsg}</p>
//           </fieldset>
//         </form>
 
//         {authStore.showOtp && (
//           <form onSubmit={handleOtpSubmit}>
//             <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
//               <label htmlFor="otp">
//                 OTP
//                 <input
//                   id="otp"
//                   type="number"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />
//               </label>
//             </div>
//             <button type="submit" style={{ width: '100%', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 0', cursor: 'pointer' }}>
//               {authStore.isLoading ? "Loading..." : "Verify"}
//             </button>
//             <p style={{ textAlign: "center", color: "red" }}>{errMsg}</p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// });
 
// export default SignInPage;