import { RouterProvider } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { router } from "./route";
import { useStore } from "./app/contexts/store.context";

const RouterProviderWithContext = observer(() => {
  const queryClient = useQueryClient();
  const store = useStore();
  const context = useMemo(
    () => ({
      queryClient,
      store,
    }),
    [queryClient, store],
  );
  return <RouterProvider router={router} context={context} />;
});

export default RouterProviderWithContext;
