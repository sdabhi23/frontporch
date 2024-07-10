import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import theme from "./theme.js";

import { App } from "./App.jsx";
import "./index.css";

const bgColor = "orange.500";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App bgColor={bgColor} />
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
