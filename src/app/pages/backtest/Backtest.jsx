import { Link, Outlet } from "@tanstack/react-router";

const Backtest = () => {
  return (
    <div>
      Backtest
      <Link to="/create">Create</Link>
      <Outlet />
    </div>
  );
};

export default Backtest;
