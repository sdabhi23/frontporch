import {
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
import { ServerStatus, ServerStatusSkeleton } from "./Server.jsx";

import { getServerStatuses } from "../utils/apis.js";

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
          // add 4 skeleton loaders using a for loop
          Array.from({ length: 4 }, (_, i) => (
            <ServerStatusSkeleton key={i} />
          ))
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
