import { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardContent, CardHeader } from "@mui/material";
import { chartApi } from "../../../services/chart.service";
import { useTheme } from "@mui/material";

const Charttable = observer(() => {
  const theme = useTheme();
  const [financialData, setFinancialData] = useState([]);
  const rowData = [];

  useEffect(() => {
    const getContinousTableData = async () => {
      try {
        const res = await chartApi.getTableData();

        if (res && res.data) {
          console.log("Fetched data:", res.data);
          setFinancialData(res.data);
        } else {
          console.warn("Received no data or response:", res);
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    getContinousTableData();

    const intervalId = setInterval(getContinousTableData, 60000);

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

  Object.keys(keyMapping).forEach((indexKey) => {
    const newIndexKey = keyMapping[indexKey];
// console.log("financialData=====>",financialData)
    if (Array.isArray(financialData)) {
      const indexData = financialData.find(
        (item) => Object.keys(item)[0] === indexKey
      );
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
    } else {
      console.error("financialData is not an array or is null");
    }
  });

  return (
    <Card
      variant="outlined"
      // sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
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
