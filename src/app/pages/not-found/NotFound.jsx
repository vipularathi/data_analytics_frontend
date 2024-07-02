import { Link } from "@tanstack/react-router";
import Layout1 from "../../theme/layout1/Layout1";

// eslint-disable-next-line mobx/missing-observer
function NotFound() {
  return (
    <Layout1>
      <div className="min-h-screen flex flex-col flex-grow items-center justify-center dark:bg-gray-50">
        <div className=" text-6xl">404 NOT FOUND</div>
        {" "}
        <br />
        <Link to="/analytics/straddle-minima">Go Back to Analytics</Link>
      </div>
    </Layout1>
  );
}

export default NotFound;
