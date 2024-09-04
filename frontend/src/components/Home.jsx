import {
  Card,
  CardBody,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRotate, FaServer } from "react-icons/fa6";
import { TbAppsFilled } from "react-icons/tb";

import React from "react";
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

export class HomePage extends React.Component {
  state = {
    serverStatus: {},
    serverStatusLoading: true,
    serverStatusError: false,
    serverStatusErrorMessage: "",
    widgetData: {},
    widgetDataLoading: true,
    widgetDataError: false,
    widgetDataErrorMessage: "",
  };

  loadWidgetData = () => {
    getWidgets(
      () => this.setState({ widgetDataLoading: true, widgetDataError: false }),
      (result) => {
        this.setState({
          widgetData: result,
          widgetDataLoading: false,
        });
      },
      (error) => {
        this.setState({
          widgetDataError: true,
          widgetDataErrorMessage: error.message,
          widgetDataLoading: false,
        });
      }
    );
  };

  loadServerStatus = () => {
    getServerStatuses(
      () =>
        this.setState({ serverStatusLoading: true, serverStatusError: false }),
      (result) => {
        this.setState({
          serverStatus: result,
          serverStatusLoading: false,
        });
      },
      (error) => {
        this.setState({
          serverStatusError: true,
          serverStatusErrorMessage: error.message,
          serverStatusLoading: false,
        });
      }
    );
  };

  componentDidMount() {
    this.loadWidgetData();
    this.loadServerStatus();
  }

  renderWidgets = () => {
    if (this.state.widgetDataLoading === true) {
      return Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />);
    } else if (this.state.widgetDataError === true) {
      return <Text>{this.state.widgetDataErrorMessage}</Text>;
    } else {
      return this.state.widgetData.map((widget) => {
        switch (widget.type) {
          case "open_weather_map":
            return <OpenWeatherMap data={widget} />;
          default:
            console.log("Value is something else");
        }
      });
    }
  };

  renderServers = () => {
    if (this.state.serverStatusLoading === true) {
      return Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />);
    } else if (this.state.serverStatusError === true) {
      return <Text>{this.state.serverStatusErrorMessage}</Text>;
    } else {
      return this.state.serverStatus.map((serverState) => (
        <ServerStatus
          key={serverState.host.hostname}
          serverState={serverState}
        />
      ));
    }
  };

  render() {
    return (
      <VStack spacing={8} align="stretch">
        <HStack>
          <Icon as={FaServer} w={6} h={6} marginRight={2} />
          <Text fontSize="2xl">Server Status</Text>
          <Spacer />
          <IconButton
            icon={<FaRotate />}
            onClick={() => {
              this.loadServerStatus();
            }}
          />
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {this.renderServers()}
        </SimpleGrid>
        <HStack>
          <Icon as={TbAppsFilled} w={6} h={6} marginRight={2} />
          <Text fontSize="2xl">Widgets</Text>
          <Spacer />
          <IconButton
            icon={<FaRotate />}
            onClick={() => {
              this.loadWidgetData();
            }}
          />
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {this.renderWidgets()}
        </SimpleGrid>
      </VStack>
    );
  }
}
