import {
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
  Card,
  CardBody,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { FaRotate, FaServer } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";

import { useEffect, useState } from "react";
import { getServerStatuses, getWidgets } from "../utils/apis.js";
import { ServerStatus } from "./Server.jsx";
import { OpenWeatherMap } from "./Weather.jsx";

const CardSkeleton = () => {
  return (
    <Card variant="elevated" h={150}>
      <CardBody>
        <HStack mb={6}>
          <SkeletonCircle h={5} w={5} />{" "}
          <SkeletonText noOfLines={1} w="100px" />
          <Spacer />
          <SkeletonCircle h={5} w={5} />
          <SkeletonCircle h={5} w={5} />
        </HStack>
        <SkeletonText noOfLines={4} />
      </CardBody>
    </Card>
  );
};

export const HomePage = () => {
  const [serverStatuses, setServerStatuses] = useState({});
  const [serverStatusLoading, setServerStatusLoading] = useState(true);

  const [widgetData, setWidgetData] = useState({});
  const [widgetDataLoading, setWidgetDataLoading] = useState(true);

  useEffect(() => {
    getWidgets(
      () => setWidgetDataLoading(true),
      (result) => {
        setWidgetData(result);
        setWidgetDataLoading(false);
      },
      (error) => {
        console.error(error);
        setWidgetDataLoading(false);
      }
    );
    getServerStatuses(
      () => setServerStatusLoading(true),
      (result) => {
        setServerStatuses(result);
        setServerStatusLoading(false);
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
              () => setServerStatusLoading(true),
              (result) => {
                setServerStatuses(result);
                setServerStatusLoading(false);
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
          ? Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />)
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
        {widgetDataLoading
          ? Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />)
          : widgetData.map((widget) => {
              switch (widget.type) {
                case "open_weather_map":
                  return <OpenWeatherMap data={widget} />;
                default:
                  console.log("Value is something else");
              }
            })}
      </SimpleGrid>
    </VStack>
  );
};
