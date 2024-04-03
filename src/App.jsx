import { RouterProvider } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./route";
import { StoreProvider } from "./app/contexts/store.context";

const queryClient = new QueryClient();

const App = observer(() => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </QueryClientProvider>
));

export default App;
