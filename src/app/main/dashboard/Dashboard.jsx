import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user.store";
import { useEffect } from "react";

const Dashboard = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    userStore.verifyToken()
  }, [])
  const handleLogout = () => {
    userStore
      .signOut()
      .then(() => {
        navigate({ to: "/signin" });
      })
  };
  return (
    <div>
      {userStore.verifyingToken ? <p>Loading...</p> : (
        <>
          <h3>Dashboard page</h3>
          <p>
            Hi <b>{userStore.user?.displayName}</b>!
          </p>
          <Link to="/axt">AXT</Link>
          <Link to="/backtest">Backtest</Link>
          <p>If you can see this, that means you are authenticated.</p>
          <div className="mt-4">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Outlet />
        </>
      )}
      
    </div>
  );
});
export default Dashboard;
