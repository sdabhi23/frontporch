import PropTypes from "prop-types";

import { Box, Heading, HStack, Icon } from "@chakra-ui/react";
import { TbCloudNetwork } from "react-icons/tb";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const AppBar = (props) => {
  return (
    <Box bg={props.bgColor} w="100%" p={8} color="white" boxShadow="base">
      <HStack>
        <Icon as={TbCloudNetwork} w={8} h={8} marginRight={3} />
        <Heading as={"h1"} size={"lg"} flex={1}>
          FrontPorch
        </Heading>
        <ThemeSwitcher />
      </HStack>
    </Box>
  );
};

AppBar.propTypes = {
  bgColor: PropTypes.string,
};
