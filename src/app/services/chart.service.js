import { BaseApi } from "./base.service";
const CHART_BASE_URL = "http://192.168.1.13:8501";
class ChartApi extends BaseApi {
  chartConfigUrl = {
    symbols: "symbol",
    straddleMinima: "straddle/minima",
    straddleIV: "straddle/iv",
    straddleCluster: "straddle/cluster",
  };
  constructor() {
    super(CHART_BASE_URL);
  }

  getSymbols() {
    this.axiosInstance.get(this.chartConfigUrl.symbols);
  }

  getStraddleMinima(payload) {
    this.axiosInstance.get(this.chartConfigUrl.straddleMinima, payload);
  }

  getStraddleIV() {
    this.axiosInstance.get(this.chartConfigUrl.straddleIV, payload);
  }

  getStraddleCluster() {
    this.axiosInstance.get(this.chartConfigUrl.straddleCluster, payload);
  }
}

export const chartApi = new ChartApi();
