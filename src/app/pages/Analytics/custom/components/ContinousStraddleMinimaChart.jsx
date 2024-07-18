// import React, { useEffect, useMemo, useState } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { useTheme } from "@mui/material";
// import { DateTime } from "luxon";
// import { chartApi } from "../../../../services/chart.service";

// const ContinousStraddleMinimaChart = ({
//   symbol,
//   expiry,
//   title,
//   modalVisible,
// }) => {
//   const [chartData, setChartData] = useState([]);
//   const theme = useTheme();

//   useEffect(() => {
//     const getContinousStraddle = async () => {
//       if (symbol && expiry) {
//         try {
//           const payload = {
//             symbol,
//             expiry,
//             cont: true,
//             // interval: 1, //uncomment if interval b/w datapoint is not 1 min
//           };
//           const res = await chartApi.getStraddleMinima(payload);
//           setChartData(res.data);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     };

//     getContinousStraddle();

//     const intervalId = setInterval(getContinousStraddle, 60000);

//     return () => clearInterval(intervalId);
//   }, [symbol, expiry]);

//   const options = useMemo(() => {
//     const chartHeight = modalVisible ? 800 : 300; // Adjusted height based on selectedChart

//     const chartData1 = chartData.map((c) => ({
//       y: c.combined_premium,
//       strike: c.strike,
//     }));
//     // const chartData1 = chartData.map((c) => ({
//     //   y: c.strike === 0 ? null : c.combined_premium,
//     //   strike: c.strike,
//     // }));

//     const categoriesData = chartData.map((c) => c.ts);

//     const startIndexOfNewDay = chartData.findIndex((r) => !r.prev);

//     const zones = chartData.map((c, i) => {
//       if (startIndexOfNewDay >= i) {
//         return {
//           value: startIndexOfNewDay,
//           color: "#fd7e14",
//         };
//       }
//       if (startIndexOfNewDay < i) {
//         return {
//           color: "#5a8dee",
//         };
//       }
//       return {};
//     });

//     return {
//       chart: {
//         type: "scatter",
//         backgroundColor: theme.palette.chart.cardColor,
//         height: chartHeight,
//         style: {
//           fontSize: "1.4rem",
//         },
//       },
//       accessibility: {
//         enabled: false,
//       },
//       exporting: {
//         enabled: false,
//       },
//       title: {
//         text: title,
//         align: "center",
//         style: {
//           color: theme.palette.chart.headingColor,
//           fontWeight: "bold",
//           fontSize: "1.4rem",
//         },
//       },
//       xAxis: {
//         categories: categoriesData,
//         labels: {
//           formatter() {
//             return DateTime.fromMillis(this.value)
//               .setZone("Asia/Kolkata")
//               .toFormat("hh:mm");
//           },
//           style: {
//             color: theme.palette.chart.headingColor,
//           },
//         },
//         tickWidth: 1,
//         tickColor: theme.palette.chart.headingColor,
//         lineColor: theme.palette.chart.headingColor,
//       },
//       yAxis: [
//         {
//           gridLineColor: theme.palette.chart.borderColor,
//           title: {
//             text: "",
//             style: {
//               color: theme.palette.chart.headingColor,
//             },
//           },
//           labels: {
//             align: "",
//             style: {
//               color: theme.palette.chart.headingColor,
//             },
//           },
//         },
//       ],
//       legend: {
//         enabled: false,
//         itemStyle: {
//           color: theme.palette.chart.headingColor,
//         },
//       },
//       plotOptions: {
//         series: {
//           animation: false,
//         },
//       },
//       tooltip: {
//         enabled: true,
//         formatter() {
//           const date = DateTime.fromMillis(this.point.category)
//             .setZone("Asia/Kolkata")
//             .toFormat("LLL dd hh:mm");
//           return `<div style="padding: 6px 3px;">${date} <br/>Strike: ${
//             this.point.options.strike
//           } <br/>Premium: ${this.point.options.y.toFixed(2)}</div>`;
//         },
//         backgroundColor: theme.palette.chart.cardColor,
//         style: {
//           color: theme.palette.chart.headingColor,
//         },
//       },
//       series: [
//         {
//           name: "",
//           data: chartData1,
//           zoneAxis: "x",
//           zones,
//           marker: {
//             enabled: true,
//             radius: 2,
//             symbol: "circle",
//           },
//           dashStyle: "Dot",
//         },
//       ],
//     };
//   }, [theme, chartData, modalVisible, title]);

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default ContinousStraddleMinimaChart;

import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "@mui/material";
import { DateTime } from "luxon";
import { chartApi } from "../../../../services/chart.service";

const ContinousStraddleMinimaChart = ({
  symbol,
  expiry,
  title,
  modalVisible,
}) => {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const getContinousStraddle = async () => {
      if (symbol && expiry) {
        try {
          const payload = {
            symbol,
            expiry,
            cont: true,
            // interval: 1, //uncomment if interval b/w datapoint is not 1 min
          };
          const res = await chartApi.getStraddleMinima(payload);
          setChartData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getContinousStraddle();

    const intervalId = setInterval(getContinousStraddle, 60000);

    return () => clearInterval(intervalId);
  }, [symbol, expiry]);

  const options = useMemo(() => {
    const chartHeight = modalVisible ? 800 : 300; // Adjusted height based on selectedChart

    // const chartData1 = chartData.map((c) => ({
    //   y: c.combined_premium,
    //   strike: c.strike,
    // }));
    const chartData1 = chartData.map((c) => ({
      y: c.strike === 0 ? null : c.combined_premium,
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
        type: "scatter",
        backgroundColor: theme.palette.chart.cardColor,
        height: chartHeight,
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
        categories: categoriesData,
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
            text: "",
            style: {
              color: theme.palette.chart.headingColor,
            },
          },
          labels: {
            align: "",
            style: {
              color: theme.palette.chart.headingColor,
            },
          },
        },
      ],
      legend: {
        enabled: false,
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
          name: "",
          data: chartData1,
          zoneAxis: "x",
          zones,
          marker: {
            enabled: true,
            radius: 2,
            symbol: "circle",
          },
          dashStyle: "Dot",
        },
      ],
    };
  }, [theme, chartData, modalVisible, title]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ContinousStraddleMinimaChart;
