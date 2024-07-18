import PropTypes from "prop-types";

import { Box, useToken } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppBar } from "./components/AppBar";
import { Configuration } from "./components/Configuration";
import { HomePage } from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/config",
    element: <Configuration />,
  },
]);

export const App = (props) => {
  const [bgToken] = useToken("colors", [props.bgColor]);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={bgToken} data-rh="true" />
      </Helmet>
      <AppBar bgColor={props.bgColor} />
      <Box p={8} >
        <RouterProvider router={router} />
      </Box>
    </>
  );
};

App.propTypes = {
  bgColor: PropTypes.string,
};
