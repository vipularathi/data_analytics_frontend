import { CHART_BASE_URL } from "../utils/url";
import { BaseApi } from "./base.service";

class ChartApi extends BaseApi {
  chartConfigUrl = {
    symbols: "symbol",
    straddleMinima: "straddle/minima",
    straddleIV: "straddle/iv",
    straddleCluster: "straddle/cluster",
    tableData:"straddle/minima/table"
  };
  constructor() {
    super(CHART_BASE_URL);
  }

  getSymbols() {
    return this.axiosInstance.get(this.chartConfigUrl.symbols);
  }

  getStraddleMinima(payload) {
    return this.axiosInstance.get(this.chartConfigUrl.straddleMinima, {
      params: payload,
    });
  }

  getStraddleIV(payload) {
    return this.axiosInstance.get(this.chartConfigUrl.straddleIV, {
      params: payload,
    });
  }

  getStraddleCluster(payload) {
    return this.axiosInstance.get(this.chartConfigUrl.straddleCluster, {
      params: payload,
    });
  }

  getTableData(payload) {
    return this.axiosInstance.get(this.chartConfigUrl.tableData, {
      params: payload,
    });
  }
}

export const chartApi = new ChartApi();
