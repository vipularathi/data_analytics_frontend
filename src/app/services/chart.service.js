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
}

export const chartApi = new ChartApi();
