import { Card, CardBody, HStack, Heading, Icon, Text } from "@chakra-ui/react";

import { FaCircle } from "react-icons/fa";
import { SiApple } from "react-icons/si";

const ServerStatus = ({ serverState }) => {
  // const [serverState, setServerState] = useState({});

  const frontendState = {};

  switch (serverState.host.os) {
    case "darwin":
      frontendState.sysIcon = <SiApple />;
      break;
    default:
      break;
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
          {frontendState.sysIcon}{" "}
          <Heading as={"h2"} size={"md"}>
            {frontendState.hostname}
          </Heading>
          <Icon as={FaCircle} color="green.400" />
        </HStack>
        <Text>Uptime: {frontendState.uptime} hours</Text>
        <Text>RAM: {frontendState.ram} GB</Text>
        <Text>
          Disk: {frontendState.disk.total} GB ({frontendState.disk.used_percent}
          % used)
        </Text>
      </CardBody>
    </Card>
  );
};

export default ServerStatus;
