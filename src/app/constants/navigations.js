export const navigations = [
  {
    id: "dashboards",
    title: "Dashboards",
    subtitle: "Unique dashboard designs",
    type: "group",
    children: [
      {
        id: "dashboards.project",
        title: "Project",
        type: "item",
        icon: "rectangle-horizontal",
        url: "/dashboards/project",
        badge: {
          content: "12",
        },
      },
      {
        id: "dashboards.analytics",
        title: "Analytics",
        type: "item",
        icon: "align-center-horizontal",
        url: "/dashboards/analytics",
      },
      {
        id: "dashboards.finance",
        title: "Finance",
        type: "item",
        icon: "rectangle-horizontal",
        url: "/dashboards/finance",
      },
      {
        id: "dashboards.crypto",
        title: "Crypto",
        type: "item",
        icon: "rectangle-horizontal",
        url: "/dashboards/crypto",
      },
    ],
  },
  {
    id: "navigation-features",
    title: "Navigation features",
    subtitle: "Collapsable levels & badge styles",
    type: "group",
    icon: "rectangle-horizontal",
    children: [
      {
        id: "navigation-features.level.0",
        title: "Level 0",
        icon: "rectangle-horizontal",
        type: "collapse",
        children: [
          {
            id: "navigation-features.level.0.1",
            title: "Level 1",
            type: "collapse",
            children: [
              {
                id: "navigation-features.level.0.1.2",
                title: "Level 2",
                type: "collapse",
                children: [
                  {
                    id: "navigation-features.level.0.1.2.3",
                    title: "Level 3",
                    type: "collapse",
                    children: [
                      {
                        id: "navigation-features.level.0.1.2.3.4",
                        title: "Level 4",
                        type: "collapse",
                        children: [
                          {
                            id: "navigation-features.level.0.1.2.3.4.5",
                            title: "Level 5",
                            type: "collapse",
                            children: [
                              {
                                id: "navigation-features.level.0.1.2.3.4.5.6",
                                title: "Level 6",
                                type: "item",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "navigation-features2.level.0",
        title: "Level 0",
        subtitle: "With subtitle",
        icon: "rectangle-horizontal",
        type: "collapse",
        children: [
          {
            id: "navigation-features2.level.0.1-1",
            title: "Level 1.1",
            type: "item",
          },
          {
            id: "navigation-features2.level.0.1-2",
            title: "Level 1.2",
            type: "item",
          },
        ],
      },
      {
        id: "navigation-features.active",
        title: "Active item",
        subtitle: "Manually marked as active",
        icon: "rectangle-horizontal",
        type: "item",
      },
      {
        id: "navigation-features.disabled-collapse",
        title: "Disabled collapse",
        subtitle: "Some subtitle",
        icon: "rectangle-horizontal",
        type: "collapse",
        disabled: true,
        children: [
          {
            id: "navigation-features.disabled-collapse.child",
            title: "You shouldn't be able to see this child",
            type: "item",
          },
        ],
      },
      {
        id: "navigation-features.disabled-item",
        title: "Disabled item",
        subtitle: "Some subtitle",
        icon: "rectangle-horizontal",
        type: "item",
        disabled: true,
      },
      {
        id: "navigation-features.badge-style-oval",
        title: "Oval badge",
        icon: "rectangle-horizontal",
        type: "item",
        badge: {
          content: "8",
        },
      },
      {
        id: "navigation-features.badge-style-rectangle",
        title: "Rectangle badge",
        icon: "rectangle-horizontal",
        type: "item",
        badge: {
          content: "Updated!",
        },
      },
      {
        id: "navigation-features.badge-style-rounded",
        title: "Rounded badge",
        icon: "rectangle-horizontal",
        type: "item",
        badge: {
          content: "NEW",
        },
      },
      {
        id: "navigation-features.badge-style-simple",
        title: "Simple badge",
        icon: "rectangle-horizontal",
        type: "item",
        badge: {
          content: "87 Unread",
        },
      },
    ],
  },
];
