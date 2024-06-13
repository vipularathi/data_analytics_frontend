// import { Link, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";
// import { observer } from "mobx-react-lite";
// import { useAuth } from "../../hooks/store/use-auth";
// import { authApi } from "../../services/auth.service";
 
// const SignInPage = observer(() => {
//   const authStore = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [errMsg, setErrMsg] = useState(null);
//   const [message, setMessage] = useState(false);
//   const navigate = useNavigate();
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrMsg(null);
//     const res = await authApi.signIn(email, password);
//     console.log(res);
 
//     if (res.output === "login success") {
//       setMessage(false);
//       navigate({ to: "/analytics/custom-chart" });
//     } else {
//       setMessage(true);
//       navigate({ to: "/signin" });
//     }
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
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         marginLeft: "40%",
//       }}
//     >
//       <div
//         style={{
//           width: "300px",
//           padding: "20px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//           boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <h3>Login page</h3>
//         {/* <Link to="/signup">Sign Up</Link>
//         <Link to="/forget-password">Forget Password</Link> */}
//         <form onSubmit={handleSubmit}>
//           <fieldset>
//             <div
//               style={{
//                 padding: 10,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//               }}
//             >
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
//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 padding: "10px 0",
//                 cursor: "pointer",
//               }}
//             >
//               {authStore.isLoading ? "Loading..." : "Login"}
//             </button>
//             <p style={{ textAlign: "center", color: "red" }}>{errMsg}</p>
//           </fieldset>
//         </form>
 
//         {authStore.showOtp && (
//           <form onSubmit={handleOtpSubmit}>
//             <div
//               style={{
//                 padding: 10,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 10,
//               }}
//             >
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
//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 backgroundColor: "#007bff",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 padding: "10px 0",
//                 cursor: "pointer",
//               }}
//             >
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

import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useAuth } from "../../hooks/store/use-auth";
import { authApi } from "../../services/auth.service";
import { TextField, Button, Typography, Box, Container,Card,CardContent } from '@mui/material';
import { useTheme } from "@mui/material";
 
const SignInPage = observer(() => {
  const theme = useTheme();
  const authStore = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
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
  console.log(theme.palette.mode)
 
  return (
    <Container maxWidth="sm">
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ width: '300px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login page
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <TextField
                id="username-input"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2,color:"white" }}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
            {errMsg && (
              <Typography variant="body2" align="center" color="error" sx={{ mt: 1 }}>
                {errMsg}
              </Typography>
            )}
          </form>
 
          {authStore.showOtp && (
            <form onSubmit={handleOtpSubmit}>
              <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <TextField
                  id="otp"
                  label="OTP"
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Loading...' : 'Verify'}
              </Button>
              {errMsg && (
                <Typography variant="body2" align="center" color="error" sx={{ mt: 1 }}>
                  {errMsg}
                </Typography>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  </Container>
  );
});
 
export default SignInPage;