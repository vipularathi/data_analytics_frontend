import { createRoute } from "@tanstack/react-router";

import ContinuousStraddle from "./ContinuousStraddle";
import { analyticsRoute } from "../analyticsConfig";

export const continuousStraddleRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/conti-straddle-minima",
  component: ContinuousStraddle,
});
