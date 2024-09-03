import {
  Card,
  CardBody,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { FaCircle, FaMicrosoft, FaServer } from "react-icons/fa6";
import {
  SiApple,
  SiLinux,
  SiMacos,
  SiOracle,
  SiRaspberrypi,
  SiUbuntu,
} from "react-icons/si";

import { FaWindows } from "react-icons/fa6";

export const ServerStatus = ({ serverState }) => {
  const frontendState = {};

  var platform = serverState.host.platform.toLowerCase();
  var os = serverState.host.os.toLowerCase();
  var kernel_version = serverState.host.kernel_version.toLowerCase()

  if (platform === "darwin") {
    frontendState.sysIcon = SiApple;
  } else if (kernel_version.includes("raspi")) {
    frontendState.sysIcon = SiRaspberrypi;
  } else if (kernel_version.includes("oracle")) {
    frontendState.sysIcon = SiOracle;
  } else if (kernel_version.includes("microsoft") || platform.includes("microsoft")) {
    frontendState.sysIcon = FaMicrosoft;
  } else {
    frontendState.sysIcon = FaServer;
  }

  if (os === "darwin") {
    frontendState.osIcon = SiMacos;
  } else if (platform === "ubuntu") {
    frontendState.osIcon = SiUbuntu;
  } else if (os === "windows") {
    frontendState.osIcon = FaWindows;
  } else {
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
    <Card variant="elevated" h={150}>
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
