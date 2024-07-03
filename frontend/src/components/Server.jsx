import {
  Card,
  CardBody,
  CircularProgress,
  HStack,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { FaCircle } from "react-icons/fa";
import { SiApple } from "react-icons/si";

const ServerStatus = () => {
  const [serverState, setServerState] = useState({});
  const [loading, setLoading] = useState(true);

  const transformServerState = (serverState) => {
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

    console.log(frontendState);

    setServerState(frontendState);
  };

  useEffect(() => {
    const hostname = window.location.host;
    setLoading(true);
    fetch(`http://${hostname}/api/sysinfo`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => transformServerState(result))
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, []);

  if (loading) {
    return (
      <Card variant="elevated">
        <CircularProgress isIndeterminate />
      </Card>
    );
  } else {
    return (
      <Card variant="elevated">
        <CardBody>
          <HStack mb={4}>
            {serverState.sysIcon}{" "}
            <Heading as={"h2"} size={"md"}>
              {serverState.hostname}
            </Heading>
            <Icon as={FaCircle} color="green.400" />
          </HStack>
          <Text>Uptime: {serverState.uptime} hours</Text>
          <Text>RAM: {serverState.ram} GB</Text>
          <Text>
            Disk: {serverState.disk.total} GB ({serverState.disk.used_percent}%
            used)
          </Text>
        </CardBody>
      </Card>
    );
  }
};

export default ServerStatus;
