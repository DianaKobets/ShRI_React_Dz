import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import GeneratorPage from "../pages/GeneratorPage/GeneratorPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/genetator",
    element: <GeneratorPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);
