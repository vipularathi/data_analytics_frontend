import { Card, CardContent, CardHeader } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import ContinousStraddleMinimaChart from "./components/ContinousStraddleMinimaChart";
import ClusterIVLineChart from "./components/ClusterIVLineChart";

const CustomChart = observer(() => {
  const data = useLoaderData({ select: (d) => d });

  const expirys = useCallback(
    (name) => {
      if (data) {
        return data.find((e) => e.name === name)?.expiry || [];
      }
      return [];
    },
    [data],
  );

  const chartSettigs = [
    {
      id: 0,
      name: "NIFTY",
      expiryName: "Current Week",
      expiry: expirys("NIFTY")[0],
      chartName: "continusStraddleMinima",
    },
    {
      id: 1,
      name: "BANKNIFTY",
      expiryName: "Current Week",
      expiry: expirys("BANKNIFTY")[0],
      chartName: "continusStraddleMinima",
    },
    {
      id: 2,
      name: "FINNIFTY",
      expiryName: "Current Week",
      expiry: expirys("FINNIFTY")[0],
      chartName: "continusStraddleMinima",
    },
    {
      id: 3,
      name: "NIFTY",
      expiryName: "Next Week",
      expiry: expirys("NIFTY")[1],
      chartName: "continusStraddleMinima",
    },
    {
      id: 4,
      name: "BANKNIFTY",
      expiryName: "Next Week",
      expiry: expirys("BANKNIFTY")[1],
      chartName: "continusStraddleMinima",
    },
    {
      id: 5,
      name: "NIFTY",
      expiryName: "Next Week",
      expiry: expirys("NIFTY")[1],
      chartName: "clusterIVLine",
    },
    {
      id: 6,
      name: "BANKNIFTY",
      expiryName: "Next Week",
      expiry: expirys("BANKNIFTY")[1],
      chartName: "clusterIVLine",
    },
    {
      id: 7,
      name: "NIFTY",
      expiryName: "Current Week",
      expiry: expirys("NIFTY")[0],
      chartName: "clusterIVLine",
    },
    {
      id: 8,
      name: "BANKNIFTY",
      expiryName: "Current Week",
      expiry: expirys("BANKNIFTY")[0],
      chartName: "clusterIVLine",
    },
    {
      id: 9,
      name: "FINNIFTY",
      expiryName: "Current Week",
      expiry: expirys("FINNIFTY")[0],
      chartName: "clusterIVLine",
    },
  ];

  return (
    <div className="p-8 px-12 sm:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {chartSettigs.map((chart) => (
        <Card
          key={chart.id}
          variant="outlined"
          sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
          className=" w-full shadow-2"
        >
          <CardHeader title={chart.name} subheader={chart.expiryName} />
          <CardContent sx={{ py: 0 }}>
            {chart.chartName === "continusStraddleMinima" && (
              <ContinousStraddleMinimaChart
                symbol={chart.name}
                expiry={chart.expiry}
              />
            )}
            {chart.chartName === "clusterIVLine" && (
              <ClusterIVLineChart symbol={chart.name} expiry={chart.expiry} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
export default CustomChart;
