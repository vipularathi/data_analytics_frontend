import { Link, Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";

const Backtest = observer(() => (
  <div>
    Backtest
    <Link to="/create">Create</Link>
    <Outlet />
  </div>
));

export default Backtest;
