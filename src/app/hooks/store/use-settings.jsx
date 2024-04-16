import { useContext } from "react";
import { StoreContext } from "../../contexts/store.context";

export const useSettings = () => {
  const context = useContext(StoreContext);
  return context.settings;
};
