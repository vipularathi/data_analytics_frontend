import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "@mui/material";
import { colorList } from "../../../../utils/constant/colorList";
import { chartApi } from "../../../../services/chart.service";

const ClusterIVLineChart = observer(
  ({ symbol, expiry, title, modalVisible }) => {
    const theme = useTheme();
    const chartRef = useRef(null);
    const timeInterval = 60000;

    // function plotChart(chartData, categoriesData, tsData) {
    //   const seriesLength = chartRef.current.chart.series.length;
    //   for (let j = 0; j < seriesLength; j += 1) {
    //     chartRef.current.chart.series[0].remove(false, false, false);
    //   }

    //   for (let i = 0; i < chartData.length; i += 1) {
    //     const elem = chartData[i];
    //     const timeStamp = tsData[i];
    //     chartRef.current.chart.addSeries(
    //       {
    //         name: `iv${i}`,
    //         ...(i === 0
    //           ? {
    //               color: "#1d4ed8",
    //               zIndex: 10,
    //               lineWidth: 3,
    //               dashStyle: "dot",
    //             }
    //           : i === chartData.length - 1
    //             ? {
    //                 color: "#fd7e14",
    //                 zIndex: 10,
    //                 lineWidth: 3,
    //                 dashStyle: "dash",
    //               }
    //             : { color: colorList[i] }),
    //         data: elem.map((iv) => ({ y: iv, timeStamp })),
    //         marker: {
    //           enabled: false,
    //         },
    //       },
    //       false,
    //       false
    //     );
    //   }
    //   chartRef.current.chart.xAxis[0].update({
    //     categories: categoriesData,
    //   });

    //   chartRef.current.chart.redraw();
    // }

    function plotChart(chartData, categoriesData, tsData, spot,symbol) {
      // console.log("spot===>", spot);
      // console.log("symbol",symbol)
      // console.log("categoriesData",categoriesData)
      const seriesLength = chartRef.current.chart.series.length;
      for (let j = 0; j < seriesLength; j += 1) {
        chartRef.current.chart.series[0].remove(false, false, false);
      }

      for (let i = 0; i < chartData.length; i += 1) {
        const elem = chartData[i];
        const timeStamp = tsData[i];
        chartRef.current.chart.addSeries(
          {
            name: `iv${i}`,
            ...(i === 0
              ? {
                  color: "#1d4ed8",
                  zIndex: 10,
                  lineWidth: 3,
                  dashStyle: "dot",
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

      chartRef.current.chart.xAxis[0].removePlotLine("spot-line");

      const spotIndex = categoriesData.findIndex(
        (category) => 
          // console.log(category),
       parseFloat(category) === parseFloat(spot)
      );

      console.log("spotIndex", spotIndex);
      if (spotIndex !== -1) {
        chartRef.current.chart.xAxis[0].addPlotLine({
          id: "spot-line", 
          color: theme.palette.mode === "light" ? "black" : "white",
          width: 2,
          value: spotIndex, 
          zIndex: 5,
          label: {
            text: `Spot: ${spot}`,
            style: {
              color: theme.palette.mode === "light" ? "black" : "white",
            },
            align: "left",
            y: 12,
          },
        });
      }

      chartRef.current.chart.xAxis[0].update({
        categories: categoriesData,
      });

      chartRef.current.chart.redraw();
    }

    useEffect(() => {
      const getStraddleCluster = async () => {
        if (symbol && expiry) {
          try {
            const payload = {
              symbol,
              expiry,
              interval: timeInterval,
            };
            const { data: resp } = await chartApi.getStraddleCluster(payload);
            if (resp.strikes.length > 0) {
              const chartData = resp.iv;
              const categoriesData = resp.strikes;
              
              const timeData = resp.ts.map((t) => t[0]);
              const spot = resp.spot;
              const symbol = resp.symbol;
              const expiry = resp.expiry;

              if (symbol[0] === "NIFTY" && expiry[0] == "2024-09-26"){
                console.log("spot",spot)
                console.log("categoriesDataOfNifty===>",categoriesData) 
              }
              plotChart(chartData, categoriesData, timeData, spot[0],symbol[0]);
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
    }, [symbol, expiry, theme.palette.mode, modalVisible]);

    const options = useMemo(
      () => ({
        chart: {
          type: "line",
          backgroundColor: theme.palette.chart.cardColor,
          height: modalVisible ? 800 : 300,
          style: {
            fontSize: "1.4rem",
          },
        },
        accessibility: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        title: {
          text: title,
          align: "center",
          style: {
            color: theme.palette.chart.headingColor,
            fontWeight: "bold",
            fontSize: "1.4rem",
          },
        },
        xAxis: {
          categories: [],
          title: {
            text: "",
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
            states: {
              hover: {
                enabled: true,
                lineWidth: 3,
              },
              inactive: {
                opacity: 0.3,
              },
            },
          },
        },
        yAxis: {
          gridLineColor: theme.palette.chart.borderColor,
          title: {
            text: "",
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
          shared: false, // This ensures only the selected line's data is shown
          formatter() {
            const point = this.point;
            const date = point.options.timeStamp.replace("T", " ");
            const { color } = point.series;
            return `Strike - ${this.x}</br><span style="color: ${color}">${date} - ${point.y.toFixed(
              3
            )}</span>`;
          },
          backgroundColor: theme.palette.chart.cardColor,
          style: {
            color: theme.palette.chart.headingColor,
          },
        },
        series: [],
      }),
      [theme, modalVisible, title]
    );

    return (
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={options}
      />
    );
  }
);

export default ClusterIVLineChart;
