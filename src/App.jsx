import { RouterProvider } from "@tanstack/react-router";
import { router } from "./route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./app/contexts/store.context";

const queryClient = new QueryClient();

function App() {
  /*
   * The RouterProvider provide the context to whole app
   */
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
