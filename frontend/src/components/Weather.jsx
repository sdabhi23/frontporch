import { Card, Text, CardBody, Heading, CardHeader } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const OpenWeatherMap = ({ data }) => {
  console.log(data);
  console.log(data.city_name);
  return (
    <Card variant="elevated" h={150}>
      <CardHeader>
        <Heading fontSize="lg">
          {data.city_name}, {data.country}
        </Heading>
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
