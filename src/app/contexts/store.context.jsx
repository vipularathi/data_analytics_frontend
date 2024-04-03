import { createContext } from "react";
import RootStore from "../store/root.store";

let rootStore = new RootStore();

const initializeStore = () => {
  const _rootStore = rootStore ?? new RootStore();
  return _rootStore;
};

export const StoreContext = createContext(rootStore);

// eslint-disable-next-line react/prop-types
export const StoreProvider = ({ children }) => {
  const store = initializeStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
