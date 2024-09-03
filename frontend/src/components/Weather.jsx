import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Icon,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  WiBarometer,
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDaySunny,
  WiDayThunderstorm,
  WiFog,
  WiHumidity,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltThunderstorm,
  WiNightClear,
  WiShowers,
  WiSnowflakeCold,
} from "react-icons/wi";

import { toTitleCase } from "../utils/strings";

const iconMap = {
  "01d": WiDaySunny,
  "01n": WiNightClear,
  "02d": WiDayCloudy,
  "02n": WiNightAltCloudy,
  "03d": WiCloud,
  "03n": WiCloud,
  "04d": WiCloudy,
  "04n": WiCloudy,
  "09d": WiShowers,
  "09n": WiShowers,
  "10d": WiDayRain,
  "10n": WiNightAltRain,
  "11d": WiDayThunderstorm,
  "11n": WiNightAltThunderstorm,
  "13d": WiSnowflakeCold,
  "13n": WiSnowflakeCold,
  "50d": WiFog,
  "50n": WiFog,
};

const unitsMap = {
  metric: "°C",
  standard: "K",
  imperial: "°F",
};

export const OpenWeatherMap = ({ data }) => {
  console.log(data);
  console.log(data.city_name);
  return (
    <Card variant="elevated">
      <CardBody>
        <HStack>
          <Icon as={iconMap[data.weather_icon]} h={8} w={8} />
          <Text>{toTitleCase(data.weather_description)}</Text>
          <Spacer />
          <Heading fontSize="s">
            {data.city_name}, {data.country}
          </Heading>
        </HStack>
        <HStack
          gap="2"
          justifyContent="center"
          marginTop="3"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <VStack gap="0" alignItems="baseline">
            <Text fontSize="m">
              {Math.floor(data.temp_actual)} {unitsMap[data.units]}
            </Text>
            <Text fontSize="xs">
              Feels like {Math.floor(data.temp_feels_like)}{" "}
              {unitsMap[data.units]}
            </Text>
          </VStack>
            <HStack>
              <Icon as={WiHumidity} h={8} w={8} />
              <Text fontSize="m">{data.humidity}</Text>
            </HStack>
            <HStack>
              <Icon as={WiBarometer} h={8} w={8} />
              <Text fontSize="m">{data.pressure}</Text>
            </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

OpenWeatherMap.PropTypes = {
  data: PropTypes.shape({
    city_name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    pressure: PropTypes.number.isRequired,
    sunrise: PropTypes.number.isRequired, // Unix timestamp
    sunset: PropTypes.number.isRequired, // Unix timestamp
    temp_actual: PropTypes.number.isRequired,
    temp_feels_like: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    weather_description: PropTypes.string.isRequired,
    weather_icon: PropTypes.string.isRequired,
    weather_id: PropTypes.string.isRequired,
    weather_main: PropTypes.string.isRequired,
  }),
};
