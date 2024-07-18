import PropTypes from "prop-types";

import {
  Box,
  DarkMode,
  Heading,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";
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
        <DarkMode>
          <IconButton icon={<FaGear />} bg="transparent" fontSize="20px" />
        </DarkMode>
        <ThemeSwitcher />
      </HStack>
    </Box>
  );
};

AppBar.propTypes = {
  bgColor: PropTypes.string,
};
