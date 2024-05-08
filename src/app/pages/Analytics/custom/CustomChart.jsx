import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import ContinousStraddleMinimaChart from "./components/ContinousStraddleMinimaChart";
import ClusterIVLineChart from "./components/ClusterIVLineChart";
import "../../../.././index.css";
import { chartApi } from "../../../services/chart.service";
const CustomChart = observer(() => {
  const data = useLoaderData({ select: (d) => d });
  const [financialData, setFinancialData] = useState([]);

  const expirys = useCallback(
    (name) => {
      // console.log("name",name)
      if (name == "NIFTY") {
        // console.log("data===>",data)
      }
      if (data) {
        return data.find((e) => e.name === name)?.expiry || [];
      }
      return [];
    },
    [data]
  );

  useEffect(() => {
    const getContinousTableData = async () => {
      try {
        // Fetch data from your API
        const res = await chartApi.getTableData();
        setFinancialData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getContinousTableData();

    const intervalId = setInterval(getContinousTableData, 60000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const chartSettigs = [
    {
      id: 0,
      name: "NIFTY",
      expiryName: "Current Week",
      expiry: expirys("NIFTY")[0],
      chartName: "continusStraddleMinima",
      title: "NF CW",
    },
    {
      id: 1,
      name: "BANKNIFTY",
      expiryName: "Current Week",
      expiry: expirys("BANKNIFTY")[0],
      chartName: "continusStraddleMinima",
      title: "BN CW",
    },
    {
      id: 2,
      name: "FINNIFTY",
      expiryName: "Current Week",
      expiry: expirys("FINNIFTY")[0],
      chartName: "continusStraddleMinima",
      title: "FN CW",
    },
    {
      id: 3,
      name: "NIFTY",
      expiryName: "Next Week",
      expiry: expirys("NIFTY")[1],
      chartName: "continusStraddleMinima",
      title: "NF NW",
    },
    {
      id: 4,
      name: "BANKNIFTY",
      expiryName: "Next Week",
      expiry: expirys("BANKNIFTY")[1],
      chartName: "continusStraddleMinima",
      title: "BN NW",
    },
    {
      id: 5,
      name: "MIDCPNIFTY",
      expiryName: "Current Week",
      expiry: expirys("MIDCPNIFTY")[0],
      chartName: "continusStraddleMinima",
      title: "MN CW",
    },
    {
      id: 6,
      name: "NIFTY",
      expiryName: "Next Week",
      expiry: expirys("NIFTY")[1],
      chartName: "clusterIVLine",
      title: "NF NW",
    },
    {
      id: 7,
      name: "BANKNIFTY",
      expiryName: "Next Week",
      expiry: expirys("BANKNIFTY")[1],
      chartName: "clusterIVLine",
      title: "BN NW",
    },
    {
      id: 8,
      name: "NIFTY",
      expiryName: "Current Month",
      expiry: expirys("NIFTY")[2],
      chartName: "clusterIVLine",
      title: "NF CM",
    },
    {
      id: 9,
      name: "NIFTY",
      expiryName: "Current Week",
      expiry: expirys("NIFTY")[0],
      chartName: "clusterIVLine",
      title: "NF CW",
    },
    {
      id: 10,
      name: "BANKNIFTY",
      expiryName: "Current Week",
      expiry: expirys("BANKNIFTY")[0],
      chartName: "clusterIVLine",
      title: "BN CW",
    },
    {
      id: 11,
      name: "FINNIFTY",
      expiryName: "Current Week",
      expiry: expirys("FINNIFTY")[0],
      chartName: "clusterIVLine",
      title: "FN CW",
    },
    {
      id: 12,
      name: "MIDCPNIFTY",
      expiryName: "Current Week",
      expiry: expirys("MIDCPNIFTY")[0],
      chartName: "clusterIVLine",
      title: "MN CW",
    },
    {
      id: 13,
    },
    {
      id: 14,
      name: "NIFTY",
      expiryName: "Next Month",
      expiry: expirys("NIFTY")[3],
      chartName: "clusterIVLine",
      title: "NF NM",
    },
  ];

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTitle = (chart) => {
    let title = "";
    if (chart.chartName === "continusStraddleMinima") {
      title = "";
    } else if (chart.chartName === "clusterIVLine") {
      title = "";
    }
    title += `  ${chart.name} ${chart.expiryName}`;
    return title;
  };

  const cardHeight = 288; // Adjust the height of the cards
  const chartHeight = 100; // Adjust the height of the charts
  const gridContainerHeight = windowHeight - 40; // Subtract any additional height if needed

  const renderChart = (chart) => {
    // const title = getTitle(chart);
    if (chart.chartName === "continusStraddleMinima") {
      return (
        <div style={{ height: chartHeight }}>
          <ContinousStraddleMinimaChart
            symbol={chart.name}
            expiry={chart.expiry}
            title={chart.title}
            // title={title}
          />
        </div>
      );
    } else if (chart.chartName === "clusterIVLine") {
      return (
        <div style={{ height: chartHeight }}>
          <ClusterIVLineChart
            symbol={chart.name}
            expiry={chart.expiry}
            title={chart.title}
            //  title={title}
          />
        </div>
      );
    } else {
      return <CardContent>No data</CardContent>;
    }
  };

  const CustomTable = () => {
    const keyMapping = {
      BANKNIFTY_CW: "BN CW",
      BANKNIFTY_NW: "BN NW",
      FINNIFTY: "FN CW",
      MIDCPNIFTY: "MD CW",
      NIFTY_CW: "NF CW",
      NIFTY_NW: "NF NW",
    };

    const rowData = financialData.map((item) => {
      const indexKey = Object.keys(item)[0];
      const newIndexKey = keyMapping[indexKey] || indexKey;
      // alert(indexKey)
      const indexMetrics = item[indexKey][0];
      return {
        straddle: newIndexKey,
        live: indexMetrics.Live,
        liveMin: indexMetrics["Live-Min"],
        maxLive: indexMetrics["Max-Live"],
        max: indexMetrics.Max,
        min: indexMetrics.Min,
      };
    });

    return (
      <Card
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className="shadow-2"
        style={{ overflowX: "auto" }}
      >
        <table className="custom-table">
          <thead>
            <tr>
              <th>Straddle</th>
              <th>Live</th>
              <th>Live-min.</th>
              <th>Max-live</th>
              <th>Max</th>
              <th>Min</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index}>
                <td className="straddle-cell" style={{ fontWeight: "600" }}>
                  {row.straddle}
                </td>
                <td>{row.live}</td>
                <td>{row.liveMin}</td>
                <td>{row.maxLive}</td>
                <td>{row.max}</td>
                <td>{row.min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  };

  return (
    <div className="sm:px-16" style={{ overflow: "hidden" }}>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{
          paddingBottom: "2px",
          maxHeight: gridContainerHeight / 3,
          overflowY: "auto",
        }}
      >
        {chartSettigs.slice(0, 3).map((chart) => (
          <Card
            key={chart.id}
            variant="outlined"
            sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
            className="shadow-2"
            style={{ height: cardHeight }}
          >
            {/* <div
              style={{
                position: "relative",
                zIndex: 1,
                backgroundColor: "white",
                padding: "3px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0, display: "inline-block" }}>
                  {chart.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    display: "inline-block",
                    marginLeft: "5px",
                  }}
                >
                  {chart.expiryName}
                </p>
              </div>
            </div> */}
            <div style={{ height: chartHeight }}>{renderChart(chart)}</div>
          </Card>
        ))}
      </div>

      <div
        className="grid grid-cols-3 lg:grid-cols-6 gap-4"
        style={{
          paddingBottom: "2px",
          maxHeight: gridContainerHeight / 3,
          overflowY: "auto",
        }}
      >
        {chartSettigs.slice(3, 9).map((chart) => (
          <Card
            key={chart.id}
            variant="outlined"
            sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
            className="shadow-2"
            style={{ height: cardHeight }}
          >
            {/* <div
              style={{
                position: "relative",
                zIndex: 1,
                backgroundColor: "white",
                padding: "3px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0, display: "inline-block" }}>
                  {chart.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    display: "inline-block",
                    marginLeft: "5px",
                  }}
                >
                  {chart.expiryName}
                </p>
              </div>
            </div> */}
            <div style={{ height: chartHeight }}>{renderChart(chart)}</div>
          </Card>
        ))}
      </div>

      <div
        className="grid grid-cols-3 lg:grid-cols-6 gap-4"
        style={{
          paddingBottom: "2px",
          maxHeight: gridContainerHeight / 3,
          overflowY: "auto",
        }}
      >
        {chartSettigs.slice(9).map((chart) => (
          <React.Fragment key={chart.id}>
            {chart.id === 13 ? (
              <CustomTable />
            ) : (
              <Card
                key={chart.id}
                variant="outlined"
                sx={{
                  backgroundColor: (theme) => theme.palette.background.paper,
                }}
                className="shadow-2"
                style={{ height: cardHeight }}
              >
                {/* <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "white",
                    padding: "3px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
              <h3 style={{ margin: 0, display: "inline-block" }}>
                {chart.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  display: "inline-block",
                  marginLeft: "5px",
                }}
              >
                {chart.expiryName}
              </p>
            </div>
                </div> */}
                <div style={{ height: chartHeight }}>{renderChart(chart)}</div>
              </Card>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});
export default CustomChart;
