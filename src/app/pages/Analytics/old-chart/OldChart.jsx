import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Card, Modal } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { observer } from "mobx-react-lite";
import ContinousStraddleMinimaChart from "./components/ContinousStraddleMinimaChart";
import ClusterIVLineChart from "./components/ClusterIVLineChart";
import "../../../.././index.css";
import ChartTable from "./Charttable";

const OldChart = observer(() => {
  const data = useLoaderData({ select: (d) => d });

  const expirys = useCallback(
    (name) => {
      if (data) {
        return data.find((e) => e.name === name)?.expiry || [];
      }
      return [];
    },
    [data]
  );

  const chartSettings = useMemo(
    () => [
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
        chartName: "chartTable",
      },
      {
        id: 14,
        name: "NIFTY",
        expiryName: "Next Month",
        expiry: expirys("NIFTY")[3],
        chartName: "clusterIVLine",
        title: "NF NM",
      },
    ],
    [expirys]
  );

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

  const cardHeight = 288;
  const chartHeight = 300;
  const gridContainerHeight = windowHeight - 40;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);

  const handleTitleClick = useCallback((chart) => {
    setSelectedChart(chart);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedChart(null);
  }, []);

  const renderChart = useCallback((chart) => {
    if (!chart) {
      return null;
    }

    switch (chart.chartName) {
      case "continusStraddleMinima":
        return (
          <ContinousStraddleMinimaChart
            symbol={chart.name}
            expiry={chart.expiry}
            title={chart.title}
            modalVisible={modalVisible}
          />
        );
      case "clusterIVLine":
        return (
          <ClusterIVLineChart
            symbol={chart.name}
            expiry={chart.expiry}
            title={chart.title}
            modalVisible={modalVisible}
          />
        );
      case "chartTable":
        return <ChartTable />;
      default:
        return <CardContent>No data</CardContent>;
    }
  }, []);

  const renderCharts = (start, end) =>
    chartSettings.slice(start, end).map((chart) => (
      <Card
        key={chart.id}
        variant="outlined"
        sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
        className="shadow-2"
        style={{ height: cardHeight }}
        onClick={() => handleTitleClick(chart)}
      >
        <div style={{ height: chartHeight }}>{renderChart(chart)}</div>
      </Card>
    ));

  const renderModalContent = useCallback(() => {
    if (!selectedChart) {
      return null;
    }

    switch (selectedChart.chartName) {
      case "continusStraddleMinima":
        return (
          <ContinousStraddleMinimaChart
            symbol={selectedChart.name}
            expiry={selectedChart.expiry}
            title={selectedChart.title}
            modalVisible={modalVisible}
          />
        );
      case "clusterIVLine":
        return (
          <ClusterIVLineChart
            symbol={selectedChart.name}
            expiry={selectedChart.expiry}
            title={selectedChart.title}
            modalVisible={modalVisible}
          />
        );
      case "chartTable":
        return <ChartTable />;
      default:
        return <CardContent>No data</CardContent>;
    }
  }, [selectedChart]);

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
        {renderCharts(0, 3)}
      </div>

      <div
        className="grid grid-cols-3 lg:grid-cols-6 gap-4"
        style={{
          paddingBottom: "2px",
          maxHeight: gridContainerHeight / 3,
          overflowY: "auto",
        }}
      >
        {renderCharts(3, 9)}
      </div>

      <div
        className="grid grid-cols-3 lg:grid-cols-6 gap-4"
        style={{
          paddingBottom: "2px",
          maxHeight: gridContainerHeight / 3,
          overflowY: "auto",
        }}
      >
        {renderCharts(9, chartSettings.length)}
      </div>

      <Modal
        open={modalVisible}
        onClose={closeModal}
        aria-labelledby="chart-modal-title"
        aria-describedby="chart-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            padding: 20,
            width: "80%",
            height: "80%",
            // maxWidth: "1400px",
            // maxHeight: "1000px",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            {renderModalContent()}
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default OldChart;
