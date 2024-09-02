import {
  Card,
  Text,
  CardBody,
  Heading,
  CardHeader,
  HStack,
  Spacer,
  Icon,
} from "@chakra-ui/react";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiDayRain,
  WiNightAltRain,
  WiDayThunderstorm,
  WiNightAltThunderstorm,
  WiSnowflakeCold,
  WiFog,
} from "react-icons/wi";
import PropTypes from "prop-types";

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

export const OpenWeatherMap = ({ data }) => {
  console.log(data);
  console.log(data.city_name);
  return (
    <Card variant="elevated" h={150}>
      <CardHeader>
        <HStack>
          <Icon as={iconMap[data.weather_0_icon]} h={10} w={10} />
          <Spacer />
          <Heading fontSize="lg">
            {data.city_name}, {data.country}
          </Heading>
        </HStack>
        <HStack>
          <Spacer/>
          <Text fontSize="m">{data.temp_actual}</Text>
          <Text fontSize="xs">Feels like {data.temp_feels_like}</Text>
        </HStack>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

OpenWeatherMap.PropTypes = {
  city_name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
  pressure: PropTypes.string.isRequired,
  sunrise: PropTypes.string.isRequired,
  sunset: PropTypes.string.isRequired,
  temp_actual: PropTypes.string.isRequired,
  temp_feels_like: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  weather_0_description: PropTypes.string.isRequired,
  weather_0_icon: PropTypes.string.isRequired,
  weather_0_id: PropTypes.string.isRequired,
  weather_0_main: PropTypes.string.isRequired,
};
