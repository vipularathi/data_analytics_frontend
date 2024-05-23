import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StoreProvider } from "./app/contexts/store.context";
import RouterProviderWithContext from "./RouterProviderWithContext";
import ThemeProvider from "./app/theme/ThemeProvider";

const queryClient = new QueryClient();

const App = observer(() => (
  <StoreProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProviderWithContext />
      </QueryClientProvider>
    </ThemeProvider>
  </StoreProvider>
));

export default App;
