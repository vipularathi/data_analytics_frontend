import { createContext } from "react";
import { observer } from "mobx-react-lite";
import RootStore from "../store/root.store";

const rootStore = new RootStore();

const initializeStore = () => {
  const _rootStore = rootStore ?? new RootStore();
  return _rootStore;
};

export const StoreContext = createContext(rootStore);

export const StoreProvider = observer(({ children }) => {
  const store = initializeStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
});
