import { useContext } from "react";
import { StoreContext } from "../../contexts/store.context";

export const useNavbarStore = () => {
  const context = useContext(StoreContext);
  return context.navbarStore;
};
