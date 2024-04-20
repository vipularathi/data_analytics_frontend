import { observer } from "mobx-react-lite";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import ChartCard from "../../../../components/ChartCard";
import { chartApi } from "../../../../services/chart.service";
import { useLoaderData } from "@tanstack/react-router";

const StraddleMinima = observer(() => {
  const data = useLoaderData({ select: (data) => data });

  const theme = useTheme();

  const [symbol, setSymbol] = useState(data[0].name);
  const [expiry, setExpiry] = useState(data[0].expiry[0]);
  const [chartData, setChartData] = useState([]);

  const symbols = useMemo(() => {
    if (data) {
      return data.map((symbol) => {
        return symbol.name;
      });
    } else return [];
  }, [data]);

  const expirys = useMemo(() => {
    if (data) {
      return (
        data.find((e) => {
          return e.name === symbol;
        })?.expiry || []
      );
    } else {
      return [];
    }
  }, [data, symbol]);

  useEffect(() => {
    const getStaddleMinima = async () => {
      if (symbol && expiry) {
        try {
          const payload = {
            symbol: symbol,
            expiry: expiry,
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
          formatter: function () {
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
        formatter: function () {
          const date = DateTime.fromMillis(this.x)
            .setZone("Asia/Kolkata")
            .toFormat("LLL dd hh:mm");
          const strike = this.points[0].point.options.strike;
          return this.points.reduce(function (s, point) {
            return `${s} </br> ${point.series.name}: ${point.y}`;
          }, `${date} </br> Strike: ${strike}`);
        },
        backgroundColor: theme.palette.chart.cardColor,
        style: {
          color: theme.palette.primary.dark,
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
      <div className="flex flex-col sm:flex-row">
        <FormControl
          sx={{ m: 1 }}
          fullWidth
          size="small"
          className="md:max-w-120"
        >
          <InputLabel
            id="demo-simple-select-label"
            sx={{ fontSize: "0.75rem" }}
          >
            SYMBOL
          </InputLabel>
          <Select
            value={symbol}
            label="SYMBOL"
            onChange={(e) => {
              setSymbol(e.target.value);
              setExpiry(
                data.find((s) => s.name === e.target.value)?.expiry[0] ?? ""
              );
            }}
          >
            {symbols.map((symbol) => {
              return (
                <MenuItem key={symbol} value={symbol}>
                  {symbol}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1 }}
          fullWidth
          size="small"
          className="md:max-w-120"
        >
          <InputLabel sx={{ fontSize: "0.75rem" }}>EXPIRY</InputLabel>
          <Select
            label="EXPIRY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          >
            {expirys.map((e) => {
              return (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartCard>
  );
});
export default StraddleMinima;
