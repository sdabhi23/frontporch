import { HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { FaServer } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";

import ServerStatus from "./Server.jsx";

const HomePage = () => {
  return (
    <VStack spacing={8} align="stretch">
      <HStack>
        <Icon as={FaServer} w={6} h={6} marginRight={2} />
        <Text fontSize="2xl">Server Status</Text>
      </HStack>
      <HStack columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        <ServerStatus />
      </HStack>
      <HStack>
        <Icon as={TbAppsFilled} w={6} h={6} marginRight={2} />
        <Text fontSize="2xl">Apps</Text>
      </HStack>
    </VStack>
  );
};

export default HomePage;
