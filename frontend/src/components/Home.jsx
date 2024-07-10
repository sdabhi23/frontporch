import {
  Center,
  CircularProgress,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRotate, FaServer } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";

import { useEffect, useState } from "react";
import { ServerStatus } from "./Server.jsx";

const getServerStatuses = (pre, success, failure) => {
  pre();
  const hostname = window.location.host;
  fetch(`http://${hostname}/api/sysinfo`, {
    method: "GET",
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => success(result))
    .catch((error) => failure(error));
};

export const HomePage = () => {
  const [serverStatuses, setServerStatuses] = useState({});
  const [serverStatusLoading, setserverStatusLoading] = useState(true);
  useEffect(() => {
    getServerStatuses(
      () => setserverStatusLoading(true),
      (result) => {
        setServerStatuses(result);
        setserverStatusLoading(false);
      },
      (error) => {
        console.error(error);
        serverStatusLoading(false);
      }
    );
  }, []);

  return (
    <VStack spacing={8} align="stretch">
      <HStack>
        <Icon as={FaServer} w={6} h={6} marginRight={2} />
        <Text fontSize="2xl">Server Status</Text>
        <Spacer />
        <IconButton
          icon={<FaRotate />}
          onClick={() => {
            getServerStatuses(
              () => setserverStatusLoading(true),
              (result) => {
                setServerStatuses(result);
                setserverStatusLoading(false);
              },
              (error) => {
                console.error(error);
                serverStatusLoading(false);
              }
            );
          }}
        />
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        {serverStatusLoading ? (
          <Center axis="both">
            <CircularProgress isIndeterminate />
          </Center>
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
