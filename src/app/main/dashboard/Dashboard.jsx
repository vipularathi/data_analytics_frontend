import { useNavigate } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/user";

const Dashboard = observer(() => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore
      .signOut()
      .then(() => {
        navigate({ to: "/signin" });
      })
  };

  return (
    <div>
      <h3>Dashboard page</h3>
      <p>
        Hi <b>{userStore.user?.displayName}</b>!
      </p>
      <p>If you can see this, that means you are authenticated.</p>
      <div className="mt-4">
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
});
export default Dashboard;
