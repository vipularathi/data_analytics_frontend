import { Card, CardContent, CardHeader } from "@mui/material";
import { observer } from "mobx-react-lite";

const ChartCard = observer(({ title, children }) => (
  <div className="p-8 px-12 sm:px-16">
    <Card
      variant="outlined"
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: "10px",
      }}
      className=" w-full"
    >
      <CardHeader className="p-16 pb-0" title={title} />
      <CardContent className="p-16">
        {children}
      </CardContent>
    </Card>
  </div>
));

export default ChartCard;
