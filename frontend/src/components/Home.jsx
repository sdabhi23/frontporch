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
import { getServerStatuses, getWidgets } from "../utils/apis.js";
import { ServerStatus, ServerStatusSkeleton } from "./Server.jsx";
import { OpenWeatherMap } from "./Weather.jsx";

export const HomePage = () => {
  const [serverStatuses, setServerStatuses] = useState({});
  const [serverStatusLoading, setserverStatusLoading] = useState(true);
  useEffect(() => {
    getWidgets(
      () => {
        return;
      },
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
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
        {serverStatusLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <ServerStatusSkeleton key={i} />
            ))
          : serverStatuses.map((serverState) => (
              <ServerStatus
                key={serverState.host.hostname}
                serverState={serverState}
              />
            ))}
      </SimpleGrid>
      <HStack>
        <Icon as={TbAppsFilled} w={6} h={6} marginRight={2} />
        <Text fontSize="2xl">Widgets</Text>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
        <OpenWeatherMap />
      </SimpleGrid>
    </VStack>
  );
};
