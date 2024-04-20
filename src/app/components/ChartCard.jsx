import { Card, CardContent, CardHeader, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";

const ChartCard = observer(({ title, children }) => {
  const theme = useTheme();
  return (
    <div className="py-8 px-12 sm:px-16">
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title={title}
          titleTypographyProps={{
            fontSize: "1.4rem",
          }}
        />
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
});

export default ChartCard;
