import { createRoute } from "@tanstack/react-router";
import StraddleMinima from "./StraddleMinima";
import { analyticsRoute } from "../analyticsConfig";

export const straddleMinRoute = createRoute({
  getParentRoute: () => analyticsRoute,
  path: "/straddle-minima",
  component: StraddleMinima,
});
