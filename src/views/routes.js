import asyncComponent from "components/asyncComponent";
import { PATHS } from "appConstants";

function createRoutes(context = "") {
  return [
    {
      path: "/",
      exact: true,
      component: asyncComponent(() => {
        return import("./Home");
      }),
    },
    {
      path: `${PATHS.CREATE}`,
      exact: true,
      component: asyncComponent(() => {
        return import("./CreateEmployee");
      }),
    },
    {
      path: `${PATHS.NOT_FOUND}`,
      component: asyncComponent(() => {
        return import("./Page404");
      }),
    },
    {
      path: `${PATHS.DETAIL}`,
      component: asyncComponent(() => {
        return import("./DetailEmployee");
      }),
    },
  ];
}

export { createRoutes };
