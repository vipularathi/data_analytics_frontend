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
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import ChartCard from "../../../../components/ChartCard";
import { chartApi } from "../../../../services/chart.service";
const ClusterIV = observer(() => {
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
    const getClusterIV = async () => {
      if (symbol && expiry) {
        try {
          const payload = {
            symbol: symbol,
            expiry: expiry,
          };
          const res = await chartApi.getStraddleIV(payload);
          setChartData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getClusterIV();
  }, [symbol, expiry]);

  const options = useMemo(() => {
    const chartData1 = chartData.map((c) => {
      if (c.minima) {
        return {
          x: c.strike,
          y: c.combined_iv,
          color: "#EF4040",
          isMinima: true,
          ts: c.ts,
        };
      } else {
        return {
          x: c.strike,
          y: c.combined_iv,
          isMinima: false,
          ts: c.ts,
        };
      }
    });

    let shapes = [];
    return {
      chart: {
        type: "scatter",
        zoomType: "xy",
        backgroundColor: theme.palette.chart.cardColor,
        height: 500,
        events: {
          render() {
            if (shapes.length > 0) {
              shapes.forEach((s) => {
                s.destroy();
              });
              shapes = [];
            }
            var chart = this;
            var points = chart.series[0].data;
            points.forEach((p, i) => {
              if (p.options && p.options.isMinima) {
                var shape = chart.renderer
                  .circle(
                    p.plotX + chart.plotLeft,
                    p.plotY + chart.plotTop,
                    3.5
                  )
                  .attr({
                    fill: "#EF4040",
                    zIndex: 4,
                  })
                  .add();

                shape.point = p;

                shape
                  .on("mouseover", function () {
                    p.setState("hover");
                    chart.tooltip.refresh(p);
                  })
                  .on("mouseout", function () {
                    p.setState();
                    chart.tooltip.hide();
                  });
                shapes.push(shape);
              }
            });
          },
        },
      },
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Straddle Cluster Chart",
        align: "center",
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      xAxis: {
        // type: 'datetime',
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
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
        tickColor: theme.palette.chart.headingColor,
        tickWidth: 1,
        lineColor: theme.palette.chart.headingColor,
      },
      yAxis: {
        gridLineColor: theme.palette.chart.borderColor,
        title: {
          text: "Straddle IV",
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
        enabled: true,
        itemStyle: {
          color: theme.palette.chart.headingColor,
        },
      },
      plotOptions: {
        series: {
          animation: false,
        },
        scatter: {
          marker: {
            radius: 2.5,
            symbol: "circle",
            states: {
              hover: {
                enabled: true,
                lineColor: "rgb(100,100,100)",
              },
            },
          },
          states: {
            hover: {
              marker: {
                enabled: false,
              },
            },
          },
        },
      },
      tooltip: {
        formatter: function () {
          const date = DateTime.fromMillis(this.point.options.ts)
            .setZone("Asia/Kolkata")
            .toFormat("LLL dd hh:mm");
          return `<div style="padding: 6px 3px;">${date} <br/>Strike: ${
            this.point.x
          } <br/><div>Straddle IV: <span style="color: ${
            this.point.color
          }">${this.point.y.toFixed(2)}</span></div></div>`;
        },

        backgroundColor: theme.palette.chart.cardColor,
        style: {
          color: theme.palette.chart.headingColor,
        },
      },
      series: [
        {
          name: "stradlleIvChart",
          marker: {
            symbol: "circle",
          },
          data: chartData1,
          showInLegend: false,
          turboThreshold: 10000,
        },
      ],
    };
  }, [theme, chartData]);

  return (
    <div>
      <ChartCard title="Cluster IV">
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

export default ClusterIV;
