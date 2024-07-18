import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Configuration } from "./components/Configuration.jsx";
import { HomePage } from "./components/Home.jsx";
import { App } from "./App.jsx";
import "./index.css";

const bgColor = "orange.500";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App bgColor={bgColor} />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/config",
        element: <Configuration />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <RouterProvider router={router} />
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
