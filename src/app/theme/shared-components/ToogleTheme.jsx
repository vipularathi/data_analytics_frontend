import { IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import LucideIcon from "../../components/LucideIcon";
import { useTheme } from "../../hooks/store/use-theme";

const ToogleTheme = observer(() => {
  const themeMode = useTheme();
  return (
    <IconButton color="inherit" size="small" onClick={() => themeMode.toggleMode()}>
      {themeMode.mode === "default" ? <LucideIcon name="sun" /> : <LucideIcon name="moon" />}
    </IconButton>
  );
});

export default ToogleTheme;
