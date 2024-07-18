import { useEffect, useState } from "react";
import { getConfig } from "../utils/apis";
import { Code, Card } from "@chakra-ui/react";

export const Configuration = () => {
  const [config, setConfig] = useState("");

  useEffect(() => {
    getConfig(
      () => {},
      (result) => {
        setConfig(JSON.stringify(result, undefined, 4));
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <Card variant="elevated" whiteSpace="pre" w="100%" p={8}>
      <Code bg="transparent" overflowX="scroll">
        {config}
      </Code>
    </Card>
  );
};
