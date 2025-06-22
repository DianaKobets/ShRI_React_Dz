import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import GenerationPage from "../pages/GeneratorPage/GeneratorPage";
import HistoryPage from "../pages/HistoryPage/HistoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "upload", element: <HomePage /> },
      { path: "generator", element: <GenerationPage /> },
      { path: "history", element: <HistoryPage /> },
    ],
  },
]);
