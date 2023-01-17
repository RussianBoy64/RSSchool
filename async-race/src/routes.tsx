import { FC } from "react";
import Garage from "./pages/Garage";
import Winners from "./pages/Winners";

interface Route {
  id: number;
  page: string;
  path: string;
  element: FC;
}

const routes: Route[] = [
  { id: 1, page: "Garage", path: "/", element: Garage },
  { id: 2, page: "Winners", path: "/winners", element: Winners },
];

export default routes;
