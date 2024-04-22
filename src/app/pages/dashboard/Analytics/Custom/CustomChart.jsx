import { Card, CardContent, CardHeader } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";
import ContinousStraddleMinimaChart from "../../../../components/ContinousStraddleMinimaChart";
import ClusterIVLineChart from "../../../../components/ClusterIVLineChart";

const SYMBOL_NAME = ["NIFTY", "BANKNIFTY", "FINNIFTY"];

const CustomChart = observer(() => {
  const data = useLoaderData({ select: (data) => data });

  const expirys = useCallback(
    (name) => {
      if (data) {
        return (
          data.find((e) => {
            return e.name === name;
          })?.expiry || []
        );
      } else return [];
    },
    [data]
  );

  return (
    <div className="py-8 px-12 sm:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="NIFTY"
          subheader="Current Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent sx={{ py: 0 }}>
          <ContinousStraddleMinimaChart
            symbol={"NIFTY"}
            expiry={expirys("NIFTY")[0]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="BANKNIFTY"
          subheader="Current Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent sx={{ py: 0 }}>
          <ContinousStraddleMinimaChart
            symbol={"BANKNIFTY"}
            expiry={expirys("BANKNIFTY")[0]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="FINNIFTY"
          subheader="Current Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent sx={{ py: 0 }}>
          <ContinousStraddleMinimaChart
            symbol={"FINNIFTY"}
            expiry={expirys("FINNIFTY")[0]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="NIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ContinousStraddleMinimaChart
            symbol={"NIFTY"}
            expiry={expirys("NIFTY")[1]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="BANKNIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ContinousStraddleMinimaChart
            symbol={"BANKNIFTY"}
            expiry={expirys("BANKNIFTY")[1]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="NIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart symbol={"NIFTY"} expiry={expirys("NIFTY")[1]} />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="BANKNIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart
            symbol={"BANKNIFTY"}
            expiry={expirys("BANKNIFTY")[1]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="NIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart symbol={"NIFTY"} expiry={expirys("NIFTY")[1]} />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="NIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart symbol={"NIFTY"} expiry={expirys("NIFTY")[0]} />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="BANKNIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart
            symbol={"BANKNIFTY"}
            expiry={expirys("BANKNIFTY")[0]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="FINNIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart
            symbol={"FINNIFTY"}
            expiry={expirys("FINNIFTY")[0]}
          />
        </CardContent>
      </Card>
      {/* TODO: MN Means */}
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="BANKNIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart
            symbol={"BANKNIFTY"}
            expiry={expirys("BANKNIFTY")[1]}
          />
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className=" w-full shadow-2"
      >
        <CardHeader
          title="NIFTY"
          subheader="Next Week"
          titleTypographyProps={{ fontSize: "1rem" }}
          subheaderTypographyProps={{ fontSize: "0.7rem" }}
        />
        <CardContent>
          <ClusterIVLineChart symbol={"NIFTY"} expiry={expirys("NIFTY")[1]} />
        </CardContent>
      </Card>
    </div>
  );
});
export default CustomChart;
