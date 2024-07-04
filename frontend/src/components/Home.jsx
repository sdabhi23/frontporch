import {
  CircularProgress,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaServer } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";

import { useEffect, useState } from "react";
import ServerStatus from "./Server.jsx";

const HomePage = () => {
  const [serverStatuses, setServerStatuses] = useState({});
  const [serverStatusLoading, setserverStatusLoading] = useState(true);
  useEffect(() => {
    const hostname = window.location.host;
    setserverStatusLoading(true);
    fetch(`http://${hostname}/api/sysinfo`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setServerStatuses(result))
      .then(() => setserverStatusLoading(false))
      .catch((error) => console.error(error));
  }, []);

  return (
    <VStack spacing={8} align="stretch">
      <HStack>
        <Icon as={FaServer} w={6} h={6} marginRight={2} />
        <Text fontSize="2xl">Server Status</Text>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        {serverStatusLoading ? (
          <CircularProgress isIndeterminate />
        ) : (
          serverStatuses.map((serverState) => (
            <ServerStatus
              key={serverState.host.hostname}
              serverState={serverState}
            />
          ))
        )}
      </SimpleGrid>
      <HStack>
        <Icon as={TbAppsFilled} w={6} h={6} marginRight={2} />
        <Text fontSize="2xl">Apps</Text>
      </HStack>
    </VStack>
  );
};

export default HomePage;
