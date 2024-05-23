import { useContext } from "react";
import { StoreContext } from "../../contexts/store.context";

// Hook for auth store

export const useAuth = () => {
  const context = useContext(StoreContext);
  return context.auth;
};
