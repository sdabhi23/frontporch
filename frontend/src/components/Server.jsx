import { Card, CardBody, HStack, Heading, Icon, Spacer, Text } from "@chakra-ui/react";

import { FaServer, FaCircle } from "react-icons/fa6";
import {
  SiApple,
  SiLinux,
  SiMacos,
  SiRaspberrypi,
  SiUbuntu,
} from "react-icons/si";

const ServerStatus = ({ serverState }) => {
  // const [serverState, setServerState] = useState({});
  console.log("ServerStatus: ", serverState);

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
          <Icon as={FaCircle} color="green.400" />{" "}
          <Heading as={"h2"} size={"sm"}>
            {frontendState.hostname}
          </Heading>
          <Spacer/>
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

export default ServerStatus;
