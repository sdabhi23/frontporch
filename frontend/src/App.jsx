import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import AppBar from "./components/AppBar";
import HomePage from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

const App = () => {
  return (
    <>
      <AppBar />
      <Box p={8}>
        <RouterProvider router={router} />
      </Box>
    </>
  );
};

export default App;
