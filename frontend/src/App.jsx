import { Box, useToken } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppBar from "./components/AppBar";
import HomePage from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const App = (props) => {
  const [bgToken] = useToken(
    // the key within the theme, in this case `theme.colors`
    "colors",
    // the subkey(s), resolving to `theme.colors.red.100`
    [props.bgColor]
    // a single fallback or fallback array matching the length of the previous arg
  );

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={bgToken} data-rh="true" />
      </Helmet>
      <AppBar bgColor={props.bgColor} />
      <Box p={8}>
        <RouterProvider router={router} />
      </Box>
    </>
  );
};

export default App;
