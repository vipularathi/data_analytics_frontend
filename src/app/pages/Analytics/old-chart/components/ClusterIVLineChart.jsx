import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@mui/material";
import { colorList } from "../../../../utils/constant/colorList";
import { chartApi } from "../../../../services/chart.service";
import { Button } from "@mui/material";
import { Play, Pause } from "lucide-react";

const ClusterIVLineChart = observer(
  ({ symbol, expiry, title, modalVisible }) => {
    const theme = useTheme();
    const chartRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPoint, setCurrentPoint] = useState(0);
    const [chartDataAll, setChartData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [spot, setSpot] = useState(null);
    const [sliceData, setSliceData] = useState([]);

    function plotChart(chartData, categoriesData, tsData, spot, symbol) {
      // console.log("chartData===>", chartData);
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
        (category) => parseFloat(category) === parseFloat(spot)
      );

      // Used for plot spot index(vertical line {spot})
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
            };
            const { data: resp } = await chartApi.getStraddleCluster(payload);
            if (resp.strikes.length > 0) {
              const chartData = resp.iv;
              const categoriesData = resp.strikes;

              const timeData = resp.ts.map((t) => t[0]);
              const spot = resp.spot;
              const symbol = resp.symbol;
              const expiry = resp.expiry;

              // Used to fix the y axis
              const allDataPoints = chartData.flat();
              let calculatedYMin = Math.floor(Math.min(...allDataPoints));
              let calculatedYMax = Math.ceil(Math.max(...allDataPoints));
              // console.log("yMin=>", calculatedYMin);
              // console.log("yMax=>", calculatedYMax);

              chartRef.current.chart.yAxis[0].update({
                min: calculatedYMin,
                max: calculatedYMax,
              });

              if (sliceData.length === 0) {
                setChartData(chartData);
                setCategoriesData(categoriesData);
                setTimeData(timeData);
                setSpot(spot);
              }

              if (!modalVisible) {
                setSliceData([]);
              }

              plotChart(
                chartData,
                categoriesData,
                timeData,
                spot[0],
                symbol[0]
              );
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

    useEffect(() => {
      let playIntervalId;

      if (isPlaying && modalVisible) {
        playIntervalId = setInterval(() => {
          setCurrentPoint((prevPoint) => {
            if (prevPoint <= chartDataAll.length - 1) {
              const newSliceData = chartDataAll.slice(0, prevPoint + 1);
              setSliceData(newSliceData);

              return prevPoint + 1;
            } else {
              clearInterval(playIntervalId);
              setIsPlaying(false);
              setCurrentPoint(0);
              return prevPoint;
            }
          });
        }, 1000);
      }

      return () => clearInterval(playIntervalId);
    }, [isPlaying, modalVisible, chartDataAll]);

    useEffect(() => {
      if (sliceData.length > 0) {
        plotChart(sliceData, categoriesData, timeData, spot, symbol);
      }
    }, [sliceData, categoriesData, timeData, spot, symbol]);

    const options = useMemo(
      () => ({
        chart: {
          type: "line",
          backgroundColor: theme.palette.chart.cardColor,
          height: modalVisible ? 700 : 300,
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
          // min: yMin,
          // max: yMax,
        },
        legend: {
          enabled: false,
          itemStyle: {
            color: theme.palette.chart.headingColor,
          },
        },
        tooltip: {
          enabled: true,
          shared: false,
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

    const modalStyleBorder = {
      position: "relative",
      border: modalVisible ? "2px solid" : "none",
      padding: modalVisible ? "10px" : "0",
      backgroundColor: "grey",
    };

    return (
      <div style={modalStyleBorder}>
        {modalVisible && (
          <Button
            variant="contained"
            color={isPlaying ? "secondary" : "primary"}
            onClick={() => setIsPlaying((prev) => !prev)}
            style={{
              bottom: "5px",
              left: "95%",
              backgroundColor: "red",
            }}
          >
            {isPlaying ? (
              <Pause style={{ width: "17px", height: "17px" }} />
            ) : (
              <Play style={{ width: "17px", height: "17px" }} />
            )}
          </Button>
        )}
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  }
);

export default ClusterIVLineChart;