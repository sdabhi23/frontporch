import PropTypes from "prop-types";

import { Box, Heading, HStack, Icon } from "@chakra-ui/react";
import { TbCloudNetwork } from "react-icons/tb";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const AppBar = (props) => {
  return (
    <Box
      css={{
        position: "-webkit-sticky",
      }}
      position="sticky"
      top="0"
      zIndex="1"
      bg={props.bgColor}
      w="100%"
      p={6}
      color="white"
      boxShadow="base"
    >
      <HStack>
        <Icon as={TbCloudNetwork} w={6} h={6} marginRight={3} />
        <Heading as={"h1"} size={"md"} flex={1}>
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
