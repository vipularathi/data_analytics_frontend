import { observer } from "mobx-react-lite";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { useLoaderData } from "@tanstack/react-router";
import ChartCard from "../../../components/ChartCard";
import { chartApi } from "../../../services/chart.service";

const continuousStraddle = observer(() => {
  const theme = useTheme();
  const data = useLoaderData({ select: (d) => d });
  const [symbol, setSymbol] = useState(data[0].name);
  const [expiry, setExpiry] = useState(data[0].expiry[0]);
  const [chartData, setChartData] = useState([]);
  // console.log(data)
  const symbols = useMemo(() => {
    if (data) {
      return data.map((s) => s.name);
    } 
    return [];
  }, [data]);

  const expirys = useMemo(() => {
    if (data) {
      return data.find((e) => e.name === symbol)?.expiry || [];
    }
    return [];
  }, [data, symbol]);

  useEffect(() => {
    const getContinousStraddle = async () => {
      if (symbol && expiry) {
        try {
          const payload = {
            symbol,
            expiry,
            cont: true,
          };
          const res = await chartApi.getStraddleMinima(payload);
          console.log("res==>",res)
          setChartData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getContinousStraddle();
  }, [symbol, expiry]);

  const options = useMemo(() => {
    const chartData1 = chartData.map((c) => ({
      y: c.combined_premium,
      strike: c.strike,
    }));

    const categoriesData = chartData.map((c) => c.ts);

    const startIndexOfNewDay = chartData.findIndex((r) => !r.prev);

    const zones = chartData.map((c, i) => {
      if (startIndexOfNewDay >= i) {
        return {
          value: startIndexOfNewDay,
          color: "#fd7e14",
        };
      }
      if (startIndexOfNewDay < i) {
        return {
          color: "#5a8dee",
        };
      }
      return {};
    });

    return {
      chart: {
        type: "spline",
        backgroundColor: theme.palette.chart.cardColor,
        height: 500,
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
        text: "Continuous Straddle Minima Chart",
        align: "center",
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      xAxis: {
        categories: categoriesData,
        labels: {
          formatter() {
            return DateTime.fromMillis(this.value)
              .setZone("Asia/Kolkata")
              .toFormat("LLL dd hh:mm");
          },
          style: {
            color: theme.palette.chart.headingColor,
          },
        },
        tickWidth: 1,
        tickColor: theme.palette.chart.headingColor,
        lineColor: theme.palette.chart.headingColor,
      },
      yAxis: [
        {
          gridLineColor: theme.palette.chart.borderColor,
          title: {
            text: "Premium",
            style: {
              color: theme.palette.chart.headingColor,
            },
          },
          labels: {
            align: "left",
            format: "{value}",
            style: {
              color: theme.palette.chart.headingColor,
            },
          },
        },
      ],
      legend: {
        enabled: true,
        itemStyle: {
          color: theme.palette.chart.headingColor,
        },
      },
      plotOptions: {
        series: {
          animation: false,
        },
      },
      tooltip: {
        enabled: true,
        formatter() {
          const date = DateTime.fromMillis(this.point.category)
            .setZone("Asia/Kolkata")
            .toFormat("LLL dd hh:mm");
          return `<div style="padding: 6px 3px;">${date} <br/>Strike: ${
            this.point.options.strike
          } <br/>Premium: ${this.point.options.y.toFixed(2)}</div>`;
        },
        backgroundColor: theme.palette.chart.cardColor,
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      series: [
        {
          name: "Premium",
          data: chartData1,
          zoneAxis: "x",
          zones,
          marker: {
            enabled: false,
          },
        },
      ],
    };
  }, [theme, chartData]);

  return (
    <div>
      <ChartCard
        title="Continuous Straddle Minima"
        symbols={symbols}
        expirys={expirys}
        setSymbol={setSymbol}
        setExpiry={setExpiry}
      >
        <div className="flex flex-col sm:flex-row">
          <FormControl
            sx={{ m: 1 }}
            fullWidth
            size="small"
            className="md:max-w-160"
          >
            <InputLabel>SYMBOL</InputLabel>
            <Select
              label="SYMBOL"
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
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1 }}
            fullWidth
            size="small"
            className="md:max-w-160"
          >
            <InputLabel>EXPIRY</InputLabel>
            <Select
              label="EXPIRY"
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
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </ChartCard>
    </div>
  );
});

export default continuousStraddle;
