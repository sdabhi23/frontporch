import {
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { FaCircle, FaServer } from "react-icons/fa6";
import {
  SiApple,
  SiLinux,
  SiMacos,
  SiRaspberrypi,
  SiUbuntu,
} from "react-icons/si";

export const ServerStatus = ({ serverState }) => {
  const frontendState = {};

  if (serverState.host.platform === "darwin") {
    frontendState.sysIcon = SiApple;
    frontendState.osIcon = SiMacos;
  } else if (
    serverState.host.platform === "ubuntu" &&
    serverState.host.kernel_version.includes("raspi")
  ) {
    frontendState.sysIcon = SiRaspberrypi;
    frontendState.osIcon = SiUbuntu;
  } else {
    frontendState.sysIcon = FaServer;
    frontendState.osIcon = SiLinux;
  }

  switch (serverState.status) {
    case "online":
      frontendState.status_color = "green.400";
      break;
    case "offline":
      frontendState.status_color = "red.400";
      break;
    default:
      frontendState.status_color = "gray.400";
  }

  frontendState.uptime = serverState.host.uptime_hours.toFixed(2);
  frontendState.hostname = serverState.host.hostname;
  frontendState.ram = (serverState.ram.total / 1024).toFixed(2);
  frontendState.disk = {};
  frontendState.disk.total = (serverState.disk.total / 1024).toFixed(2);
  frontendState.disk.used_percent = serverState.disk.used_percent.toFixed(2);

  return (
    <Card variant="elevated">
      <CardBody>
        <HStack mb={4}>
          <Icon as={FaCircle} color={frontendState.status_color} />{" "}
          <Heading as={"h2"} size={"sm"}>
            {frontendState.hostname}
          </Heading>
          <Spacer />
          <Icon as={frontendState.osIcon} h={5} w={5} />
          <Icon as={frontendState.sysIcon} h={5} w={5} />
        </HStack>
        <Text fontSize="sm">Uptime: {frontendState.uptime} hours</Text>
        <Text fontSize="sm">RAM: {frontendState.ram} GB</Text>
        <Text fontSize="sm">
          Disk: {frontendState.disk.total} GB ({frontendState.disk.used_percent}
          % used)
        </Text>
      </CardBody>
    </Card>
  );
};

ServerStatus.propTypes = {
  serverState: PropTypes.shape({
    host: PropTypes.shape({
      uptime: PropTypes.number,
      uptime_hours: PropTypes.number,
      hostname: PropTypes.string.isRequired,
      os: PropTypes.string,
      platform: PropTypes.string,
      platform_version: PropTypes.string,
      kernel_version: PropTypes.string,
      kernel_arch: PropTypes.string,
    }).isRequired,
    status: PropTypes.oneOf(["online", "offline"]).isRequired,
    ram: PropTypes.shape({
      total: PropTypes.number,
      available: PropTypes.number,
      used: PropTypes.number,
      used_percent: PropTypes.number,
    }),
    disk: PropTypes.shape({
      total: PropTypes.number,
      available: PropTypes.number,
      used: PropTypes.number,
      used_percent: PropTypes.number,
    }),
    cpu: PropTypes.shape({
      physical_cores: PropTypes.number,
      logical_cores: PropTypes.number,
      model: PropTypes.string,
      vendor: PropTypes.string,
      family: PropTypes.string,
    }),
    ip_addresses: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export const ServerStatusSkeleton = () => {
  return (
    <Card variant="elevated">
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
