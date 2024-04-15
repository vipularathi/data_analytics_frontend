import { useContext } from "react";
import { StoreContext } from "../../contexts/store.context";

export const useAuth = () => {
  const context = useContext(StoreContext);
  return context.auth;
};
