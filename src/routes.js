import { Login, ChatQnAController, Dashboard } from "./components";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,
    protected: true,
  },
];

export default routes;
