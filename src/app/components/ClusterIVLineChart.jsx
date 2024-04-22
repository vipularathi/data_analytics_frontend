import { observer } from "mobx-react-lite";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useRef } from "react";
import { chartApi } from "../services/chart.service";
import { colorList } from "../utils/constant/colorList";
import { useTheme } from "@mui/material";

const ClusterIVLineChart = observer(({ symbol, expiry }) => {
  const theme = useTheme();
  const chartRef = useRef(null);
  useEffect(() => {
    const getStraddleCluster = async () => {
      if (symbol && expiry) {
        try {
          const payload = {
            symbol: symbol,
            expiry: expiry,
          };
          const { data: resp } = await chartApi.getStraddleCluster(payload);
          if (resp.strikes.length > 0) {
            let chartData = resp.iv;
            const categoriesData = resp.strikes;
            const timeData = resp.ts.map((t) => t[0]);
            plotChart(chartData, categoriesData, timeData);
            chartRef.current.chart.hideLoading();
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (chartRef.current && chartRef.current.chart) {
      getStraddleCluster();
    }
    const intervalId = setInterval(() => {
      if (chartRef.current && chartRef.current.chart) {
        getStraddleCluster();
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [symbol, expiry, theme.palette.mode]);

  function plotChart(chartData, categoriesData, tsData) {
    const seriesLenght = chartRef.current.chart.series.length;
    for (let j = 0; j < seriesLenght; j++) {
      chartRef.current.chart.series[0].remove(false, false, false);
    }

    for (let i = 0; i < chartData.length; i++) {
      const elem = chartData[i];
      const timeStamp = tsData[i];
      chartRef.current.chart.addSeries(
        {
          name: "iv" + i,
          ...(i === 0
            ? {
                color: "#1d4ed8",
                zIndex: 10,
                lineWidth: 3,
                dashStyle: "dash",
              }
            : i === chartData.length - 1
              ? {
                  color: "#fd7e14",
                  zIndex: 10,
                  lineWidth: 3,
                  dashStyle: "dash",
                }
              : { color: colorList[i] }),
          data: elem.map((iv) => ({ y: iv, timeStamp })),
          marker: {
            enabled: false,
          },
        },
        false,
        false
      );
    }
    chartRef.current.chart.xAxis[0].update({
      categories: categoriesData,
    });

    chartRef.current.chart.redraw();
  }

  const options = useMemo(() => {
    return {
      chart: {
        type: "line",
        backgroundColor: theme.palette.chart.cardColor,
        height: 300,
      },
      accessibility: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      title: {
        text: "Strike Cluster IV",
        align: "center",
        style: {
          color: theme.palette.chart.headingColor,
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
      xAxis: {
        categories: [],
        title: {
          text: "Strike",
          style: {
            color: theme.palette.chart.headingColor,
          },
        },
        labels: {
          format: "{value}",
          style: {
            color: theme.palette.chart.headingColor,
          },
        },
        tickColor: theme.palette.chart.headingColor,
        tickWidth: 1,
        lineColor: theme.palette.chart.headingColor,
      },
      plotOptions: {
        series: {
          animation: false,
        },
      },
      yAxis: {
        gridLineColor: theme.palette.chart.borderColor,
        title: {
          text: "IV",
          style: {
            color: theme.palette.chart.headingColor,
          },
        },
        labels: {
          format: "{value}",
          style: {
            color: theme.palette.chart.headingColor,
          },
        },
      },
      legend: {
        enabled: false,
        itemStyle: {
          color: theme.palette.chart.headingColor,
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        formatter: function () {
          const strike = this.x;
          return this.points.reduce(function (s, point) {
            const date = point.point.options.timeStamp.replace("T", " ");
            const color = point.color;
            return `${s} </br> <span style="color: ${color}">${date} - ${point.y.toFixed(3)}</span>`;
          }, `Strike - ${strike}`);
        },
        backgroundColor: theme.palette.chart.cardColor,
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      series: [],
    };
  }, [theme]);
  return (
    <HighchartsReact ref={chartRef} highcharts={Highcharts} options={options} />
  );
});

export default ClusterIVLineChart;
