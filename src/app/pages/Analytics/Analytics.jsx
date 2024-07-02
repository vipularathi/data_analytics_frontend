import { Outlet } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import Layout1 from "../../theme/layout1/Layout1";

const Analytics = observer(() => (
  <Layout1>
    <Outlet />
   </Layout1>
));
export default Analytics;
