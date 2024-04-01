import { Link, useRouteContext } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  const { isAuthenticated } = useRouteContext({
    select: (userStore) => {
      return {
        user: userStore.userStore,
        isAuthenticated: userStore.userStore.isAuthenticated,
      };
    },
  });

  return (
    <div>
      <h3>Welcome Home!</h3>
      <p>
        <Link to="/dashboard" className="font-semibold">
          {isAuthenticated ? "Go" : "Try going"} to the dashboard page
        </Link>
      </p>
    </div>
  );
});

export default Home;
