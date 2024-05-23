import { observer } from "mobx-react-lite";
import { Outlet } from "@tanstack/react-router";

/** Routing for Dashboard page */
const Dashboard = observer(() => <Outlet />);

export default Dashboard;
