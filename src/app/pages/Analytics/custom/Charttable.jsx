// import { useEffect, useMemo, useState } from "react";
// import { observer } from "mobx-react-lite";
// import { Card, CardContent, CardHeader } from "@mui/material";
// import { chartApi } from "../../../services/chart.service";
// import { useTheme } from "@mui/material";

// const Charttable = observer(() => {
//   const theme = useTheme();
//   const [financialData, setFinancialData] = useState([]);

//   useEffect(() => {
//     const getContinousTableData = async () => {
//       try {
//         const res = await chartApi.getTableData();

//         setFinancialData(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getContinousTableData();

//     const intervalId = setInterval(getContinousTableData, 60000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const keyMapping = {
//     BANKNIFTY_CW: "BN CW",
//     BANKNIFTY_NW: "BN NW",
//     FINNIFTY: "FN CW",
//     MIDCPNIFTY: "MD CW",
//     NIFTY_CW: "NF CW",
//     NIFTY_NW: "NF NW",
//   };

//   const rowData = financialData.map((item) => {
//     const indexKey = Object.keys(item)[0];
//     const newIndexKey = keyMapping[indexKey] || indexKey;
//     const indexMetrics = item[indexKey][0];
//     return {
//       straddle: newIndexKey,
//       live: indexMetrics.Live,
//       liveMin: indexMetrics["Live-Min"],
//       maxLive: indexMetrics["Max-Live"],
//       max: indexMetrics.Max,
//       min: indexMetrics.Min,
//     };
//   });

//   return (
//     <Card
//       variant="outlined"
//       sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
//       className="shadow-2"
//       style={{ overflowX: "auto" }}
//     >
//       {theme.palette.mode == "light" ? (
//         <table className="custom-table">
//           <thead>
//             <tr>
//               <th>Straddle</th>
//               <th>Live</th>
//               <th>Live-min.</th>
//               <th>Max-live</th>
//               <th>Max</th>
//               <th>Min</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rowData.map((row, index) => (
//               <tr key={index}>
//                 <td className="straddle-cell" style={{ fontWeight: "600" }}>
//                   {row.straddle}
//                 </td>
//                 <td>{row.live}</td>
//                 <td>{row.liveMin}</td>
//                 <td>{row.maxLive}</td>
//                 <td>{row.max}</td>
//                 <td>{row.min}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <table className="custom-table-dark">
//           <thead>
//             <tr>
//               <th>Straddle</th>
//               <th>Live</th>
//               <th>Live-min.</th>
//               <th>Max-live</th>
//               <th>Max</th>
//               <th>Min</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rowData.map((row, index) => (
//               <tr key={index}>
//                 <td className="straddle-cell" style={{ fontWeight: "600" }}>
//                   {row.straddle}
//                 </td>
//                 <td>{row.live}</td>
//                 <td>{row.liveMin}</td>
//                 <td>{row.maxLive}</td>
//                 <td>{row.max}</td>
//                 <td>{row.min}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </Card>
//   );
// });

// export default Charttable;



import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardContent, CardHeader } from "@mui/material";
import { chartApi } from "../../../services/chart.service";
import { useTheme } from "@mui/material";
 
const Charttable = observer(() => {
  const theme = useTheme();
  const [financialData, setFinancialData] = useState([]);
 
  useEffect(() => {
    const getContinousTableData = async () => {
      try {
        // Fetch data from your API
        const res = await chartApi.getTableData();
console.log("res.data",res.data)
        setFinancialData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
 
    getContinousTableData();
 
    const intervalId = setInterval(getContinousTableData, 60000);
 
    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
 
  const keyMapping = {
    NIFTY_CW: "NF CW",
    BANKNIFTY_CW: "BN CW",
    MIDCPNIFTY: "MD CW",
    FINNIFTY: "FN CW",
    NIFTY_NW: "NF NW",
    BANKNIFTY_NW: "BN NW",
  };
 
  // const rowData = financialData.map((item) => {
  //   const indexKey = Object.keys(item)[0];
  //   // console.log("indexKey",indexKey)
   
  //   const newIndexKey = keyMapping[indexKey] || indexKey;
  //   console.log("newIndexKey",newIndexKey)
  //   const indexMetrics = item[indexKey][0];
  //   // console.log("indexMetrics",indexMetrics)
  //   return {
  //     straddle: newIndexKey,
  //     live: indexMetrics.Live,
  //     liveMin: indexMetrics["Live-Min"],
  //     maxLive: indexMetrics["Max-Live"],
  //     max: indexMetrics.Max,
  //     min: indexMetrics.Min,
  //   };
  // });
  // const sortedRowData = rowData.sort((a, b) => {
  //   return Object.keys(keyMapping).indexOf(a.straddle) - Object.keys(keyMapping).indexOf(b.straddle);
  // });
 
 
  const rowData = [];
// Iterate over keyMapping to ensure the order
Object.keys(keyMapping).forEach(indexKey => {
  const newIndexKey = keyMapping[indexKey];
  const indexData = financialData.find(item => Object.keys(item)[0] === indexKey);
  if (indexData) {
    const indexMetrics = indexData[indexKey][0];
    rowData.push({
      straddle: newIndexKey,
      live: indexMetrics.Live,
      liveMin: indexMetrics["Live-Min"],
      maxLive: indexMetrics["Max-Live"],
      max: indexMetrics.Max,
      min: indexMetrics.Min,
    });
  }
});
 
  console.log("sortedRowData",rowData);
  return (
    <Card
      variant="outlined"
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      className="shadow-2"
      style={{ overflowX: "auto" }}
    >
      {theme.palette.mode == "light" ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Straddle</th>
              <th>Live</th>
              <th>Live-min.</th>
              <th>Max-live</th>
              <th>Max</th>
              <th>Min</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index}>
                <td className="straddle-cell" style={{ fontWeight: "600" }}>
                  {row.straddle}
                </td>
                <td>{row.live}</td>
                <td>{row.liveMin}</td>
                <td>{row.maxLive}</td>
                <td>{row.max}</td>
                <td>{row.min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="custom-table-dark">
          <thead>
            <tr>
              <th>Straddle</th>
              <th>Live</th>
              <th>Live-min.</th>
              <th>Max-live</th>
              <th>Max</th>
              <th>Min</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index}>
                <td className="straddle-cell" style={{ fontWeight: "600" }}>
                  {row.straddle}
                </td>
                <td>{row.live}</td>
                <td>{row.liveMin}</td>
                <td>{row.maxLive}</td>
                <td>{row.max}</td>
                <td>{row.min}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
});
 
export default Charttable;