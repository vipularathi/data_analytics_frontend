import { observer } from "mobx-react-lite";
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "@tanstack/react-router";
import ChartCard from "../../../../components/ChartCard";
import { chartApi } from "../../../../services/chart.service";
import { colorList } from "../../../../utils/constant/colorList";

const ClusterIVLine = observer(() => {
  const theme = useTheme();
  const chartRef = useRef(null);
  const data = useLoaderData({ select: (d) => d });
  const [symbol, setSymbol] = useState(data[0].name);
  const [expiry, setExpiry] = useState(data[0].expiry[0]);

  const symbols = useMemo(() => {
    if (data) {
      return data.map((s) => s.name);
    } return [];
  }, [data]);

  const expirys = useMemo(() => {
    if (data) {
      return (
        data.find((e) => e.name === symbol)?.expiry || []
      );
    }
    return [];
  }, [data, symbol]);

  function plotChart(chartData, categoriesData, tsData) {
    const seriesLenght = chartRef.current.chart.series.length;
    for (let j = 0; j < seriesLenght; j += 1) {
      chartRef.current.chart.series[0].remove(false, false, false);
    }

    for (let i = 0; i < chartData.length; i += 1) {
      const elem = chartData[i];
      const timeStamp = tsData[i];
      chartRef.current.chart.addSeries(
        {
          name: `iv${i}`,
          // eslint-disable-next-line no-nested-ternary
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
        false,
      );
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

  const options = useMemo(() => ({
    chart: {
      type: "line",
      backgroundColor: theme.palette.chart.cardColor,
      height: 500,
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
      formatter() {
        const strike = this.x;
        return this.points.reduce((s, point) => {
          const date = point.point.options.timeStamp.replace("T", " ");
          const { color } = point;
          return `${s} </br> <span style="color: ${color}">${date} - ${point.y.toFixed(3)}</span>`;
        }, `Strike - ${strike}`);
      },
      backgroundColor: theme.palette.chart.cardColor,
      style: {
        color: theme.palette.chart.headingColor,
      },
    },
    series: [],
  }), [theme]);

  return (
    <div>
      <ChartCard title="Strike Cluster IV">
        <div className="flex flex-col sm:flex-row">
          <FormControl
            sx={{ m: 1 }}
            fullWidth
            size="small"
            className="md:max-w-120"
          >
            <FormLabel sx={{ fontSize: "0.75rem" }}>SYMBOL</FormLabel>
            <Select
              value={symbol}
              displayEmpty
              onChange={(e) => {
                setSymbol(e.target.value);
                setExpiry(
                  data.find((s) => s.name === e.target.value)?.expiry[0] ?? "",
                );
              }}
            >
              {symbols.map((s) => (
                <MenuItem key={s} value={s}>
                  {symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1 }}
            fullWidth
            size="small"
            className="md:max-w-120"
          >
            <FormLabel sx={{ fontSize: "0.75rem" }}>EXPIRY</FormLabel>
            <Select
              value={expiry}
              displayEmpty
              onChange={(e) => setExpiry(e.target.value)}
            >
              {expirys.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <HighchartsReact
          ref={chartRef}
          highcharts={Highcharts}
          options={options}
        />
      </ChartCard>
    </div>
  );
});
export default ClusterIVLine;
