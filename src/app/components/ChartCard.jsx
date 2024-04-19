import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { observer } from "mobx-react-lite";

const ChartCard = observer(({ title, children }) => {
  return (
    <div className="p-8">
      <Card className=" w-full shadow-2">
        <CardHeader title={title} />
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
});

export default ChartCard;
