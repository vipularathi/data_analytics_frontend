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

const StraddleMinima = observer(() => {
  const data = useLoaderData({ select: (d) => d });

  const theme = useTheme();

  const [symbol, setSymbol] = useState(data[0].name);
  const [expiry, setExpiry] = useState(data[0].expiry[0]);
  const [chartData, setChartData] = useState([]);

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
    const getStaddleMinima = async () => {
      if (symbol && expiry) {
        try {
          const payload = {
            symbol,
            expiry,
          };
          const res = await chartApi.getStraddleMinima(payload);
          setChartData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getStaddleMinima();
  }, [symbol, expiry]);

  const options = useMemo(() => {
    const chartData1 = chartData.map((c) => ({
      y: c.combined_premium,
      strike: c.strike,
    }));
    const chartData2 = chartData.map((c) => ({
      y: c.combined_iv,
      strike: c.strike,
    }));
    const categoriesData = chartData.map((c) => c.ts);

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
        text: "Straddle Minima & IV Chart",
        align: "center",
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      xAxis: {
        categories: categoriesData ?? [],
        labels: {
          formatter() {
            return DateTime.fromMillis(this.value)
              .setZone("Asia/Kolkata")
              .toFormat("hh:mm");
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
        {
          gridLineColor: theme.palette.chart.borderColor,
          opposite: true,
          title: {
            text: "Straddle IV",
            style: {
              color: theme.palette.chart.headingColor,
            },
          },
          labels: {
            align: "right",
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
        shared: true,
        formatter() {
          const date = DateTime.fromMillis(this.x)
            .setZone("Asia/Kolkata")
            .toFormat("LLL dd hh:mm");
          const { strike } = this.points[0].point.options;
          return this.points.reduce(
            (s, point) => `${s} </br> ${point.series.name}: ${point.y}`,
            `${date} </br> Strike: ${strike}`,
          );
        },
        backgroundColor: theme.palette.chart.cardColor,
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      series: [
        {
          name: "Premium",
          data: chartData1 ?? [],
          marker: {
            enabled: false,
          },
          yAxis: 0,
          color: "#5a8dee",
        },
        {
          name: "IV",
          data: chartData2 ?? [],
          marker: {
            enabled: false,
          },
          yAxis: 1,
          color: "#fd7e14",
        },
      ],
    };
  }, [theme, chartData]);

  return (
    <ChartCard title="Straddle Minima">
      <div className="flex flex-col pb-16 sm:flex-row">
        <FormControl sx={{ m: 1 }} size="small" className="md:max-w-160">
          <InputLabel id="demo-simple-select-label">SYMBOL</InputLabel>
          <Select
            value={symbol}
            label="SYMBOL"
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
        <FormControl sx={{ m: 1 }} size="small" className="md:max-w-160">
          <InputLabel>EXPIRY</InputLabel>
          <Select
            label="EXPIRY"
            value={expiry}
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
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartCard>
  );
});
export default StraddleMinima;
