import { Box, Heading, HStack, Icon } from "@chakra-ui/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { TbCloudNetwork } from "react-icons/tb";

const AppBar = () => {
  return (
    <Box bg="orange.500" w="100%" p={8} color="white" boxShadow="base">
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

export default AppBar;
