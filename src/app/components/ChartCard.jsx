import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Paper,
  Select,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useMemo, useState } from "react";
import { chartApi } from "../services/chart.service";
import { useQuery } from "@tanstack/react-query";

const ChartCard = observer(({ title }) => {
  const theme = useTheme();

  const [symbol, setSymbol] = useState({});

  const query = useQuery({
    queryKey: "symbol",
    queryFn: chartApi.getSymbols,
  });

  console.log(query);

  const options = useMemo(() => {
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
        categories: [],
        labels: {
          formatter: function () {
            return luxon.DateTime.fromMillis(this.value)
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
          const date = luxon.DateTime.fromMillis(this.x)
            .setZone("Asia/Kolkata")
            .toFormat("LLL dd hh:mm");
          const strike = this.points[0].point.options.strike;
          return this.points.reduce(function (s, point) {
            return `${s} </br> ${point.series.name}: ${point.y}`;
          }, `${date} </br> Strike: ${strike}`);
        },
        backgroundColor: theme.palette.primary.main,
        style: {
          color: theme.palette.primary.dark,
        },
      },
      series: [
        {
          name: "Premium",
          data: [],
          marker: {
            enabled: false,
          },
          yAxis: 0,
          color: "#5a8dee",
        },
        {
          name: "IV",
          data: [],
          marker: {
            enabled: false,
          },
          yAxis: 1,
          color: "#fd7e14",
        },
      ],
    };
  }, [theme]);

  return (
    <div className="p-8">
      <Card className=" w-full shadow-2">
        <CardHeader title={title} />
        <CardContent>
          <div className="flex flex-col sm:flex-row">
            <FormControl
              sx={{ m: 1 }}
              fullWidth
              size="small"
              className="md:max-w-120"
            >
              <Select value={""} displayEmpty>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1 }}
              fullWidth
              size="small"
              className="md:max-w-120"
            >
              <Select value={""} displayEmpty>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default ChartCard;
