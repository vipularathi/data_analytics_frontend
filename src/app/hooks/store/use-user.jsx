import { useContext } from "react";
import { StoreContext } from "../../contexts/store.context";

export const useUser = () => {
  const context = useContext(StoreContext);
  return context.user;
};
