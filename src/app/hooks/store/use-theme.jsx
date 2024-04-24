import { useContext } from "react";
import { StoreContext } from "../../contexts/store.context";

// Hook for user store

export const useTheme = () => {
  const context = useContext(StoreContext);
  return context.theme;
};
