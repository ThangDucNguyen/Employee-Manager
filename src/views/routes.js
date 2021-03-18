import asyncComponent from "components/asyncComponent";
import { PATHS } from "appConstants";

function createRoutes(context = "") {
  console.log("PATHS", PATHS);
  return [
    {
      path: `${PATHS.LIST}`,
      exact: true,
      component: asyncComponent(() => {
        return import("./Home");
      }),
    },
    {
      path: `${PATHS.ADD}`,
      exact: true,
      component: asyncComponent(() => {
        return import("./CreateEmployee");
      }),
    },
    {
      path: `${PATHS.EDIT}`,
      component: asyncComponent(() => {
        return import("./EditEmployee");
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
