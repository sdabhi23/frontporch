import React from "react";
import ReactDOM from "react-dom/client";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
