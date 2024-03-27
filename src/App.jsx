import { Outlet, RouterProvider } from "@tanstack/react-router";
import { router } from "./route";

function App() {
  /*
   * The RouterProvider provide the context to whole app 
   */
  return <RouterProvider router={router} />;
}

export default App;
