import { RouterProvider } from "@tanstack/react-router";
import { router } from "./route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  /*
   * The RouterProvider provide the context to whole app
   */
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
