import { observer } from "mobx-react-lite";
import { FormControl, FormLabel, MenuItem, Select, useTheme } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import ChartCard from "../../../../components/ChartCard";
import { chartApi } from "../../../../services/chart.service";

const StraddleMinima = observer(() => {
  const theme = useTheme();

  const [symbol, setSymbol] = useState("");
  const [expiry, setExpiry] = useState("");
  const [chartData, setChartData] = useState([]);

  const { data } = useQuery({
    queryKey: ["symbol"],
    queryFn: () => chartApi.getSymbols().then((res) => res.data),
    staleTime: Infinity,
  });

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
      exporting: {
        enabled: false,
      },
      title: {
        text: "Straddle Minima & IV Chart",
        align: "center",
        style: {
          color: theme.palette.primary.dark,
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
            color: theme.palette.primary.dark,
          },
        },
        tickWidth: 1,
        tickColor: theme.palette.primary.dark,
        lineColor: theme.palette.primary.dark,
      },
      yAxis: [
        {
          gridLineColor: theme.palette.chart.borderColor,
          title: {
            text: "Premium",
            style: {
              color: theme.palette.primary.dark,
            },
          },
          labels: {
            align: "left",
            format: "{value}",
            style: {
              color: theme.palette.primary.dark,
            },
          },
        },
        {
          gridLineColor: theme.palette.chart.borderColor,
          opposite: true,
          title: {
            text: "Straddle IV",
            style: {
              color: theme.palette.primary.dark,
            },
          },
          labels: {
            align: "right",
            format: "{value}",
            style: {
              color: theme.palette.primary.dark,
            },
          },
        },
      ],
      legend: {
        enabled: true,
        itemStyle: {
          color: theme.palette.primary.dark,
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
    <div>
      <ChartCard
        title="Straddle Minima"
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
            className="md:max-w-120"
          >
            <FormLabel>Symbol</FormLabel>
            <Select
              value={symbol}
              displayEmpty
              onChange={(e) => {
                setSymbol(e.target.value);
                setExpiry("");
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
            <FormLabel>Expiry</FormLabel>
            <Select
              value={expiry}
              displayEmpty
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
    </div>
  );
});
export default StraddleMinima;
