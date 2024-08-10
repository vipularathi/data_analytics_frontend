/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
  {
    id: "straddleMinima",
    title: "Straddle Minima & IV",
    icon: "circle",
    url: "/analytics/straddle-minima",
    type: "item",
    active: false,
  },
  {
    id: "continuosStraddleMinima",
    title: "Continuous Straddle Minima",
    icon: "circle",
    url: "/analytics/conti-straddle-minima",
    type: "item",
    active: false,
  },
  {
    id: "cluster",
    title: "Cluster IV",
    icon: "circle",
    url: "/analytics/cluster-iv",
    type: "item",
    active: false,
  },
  {
    id: "clusterLine",
    title: "Cluster IV Line",
    icon: "circle",
    url: "/analytics/cluster-iv-line",
    type: "item",
    active: false,
  },
  {
    id: "customChart",
    title: "Custom Chart with Filter",
    icon: "circle",
    url: "/analytics/custom-chart",
    type: "item",
    active: false,
  },
  {
    id: "oldChart",
    title: "Custom Chart w/o Filter",
    icon: "circle",
    url: "/analytics/old-chart",
    type: "item",
    active: false,
  },
];
export default navigationConfig;
