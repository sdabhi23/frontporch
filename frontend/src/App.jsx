import { useEffect, useState } from "react";
import {
  Box,
  useToken,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { FaHouse } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Outlet, Link, useLocation } from "react-router-dom";
import { AppBar } from "./components/AppBar";

export const App = (props) => {
  const [bgToken] = useToken("colors", [props.bgColor]);
  let location = useLocation();
  const [page, setPage] = useState("");

  useEffect(() => {
    setPage(location.pathname);
  }, [location]);

  return (
    <>
      <Helmet>
        <meta name="theme-color" content={bgToken} data-rh="true" />
      </Helmet>
      <AppBar bgColor={props.bgColor} />
      <Box p={8}>
        {page != "/" && (
          <Breadcrumb marginBottom={8}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/" lineHeight={0.75} marginRight={0.5}>
                <Icon as={FaHouse} w={4} h={4}/>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Configuration</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        )}
        <Outlet />
      </Box>
    </>
  );
};

App.propTypes = {
  bgColor: PropTypes.string,
};
