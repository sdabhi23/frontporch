package weather

import (
	"frontporch/config"
	"strconv"
)

type WeatherInfoRequest struct {
	CityName string `json:"name"`
	Temp     struct {
		Actual    float64 `json:"temp"`
		FeelsLike float64 `json:"feels_like"`
		Pressure  int     `json:"pressure"`
		Humidity  int     `json:"humidity"`
	} `json:"main"`
	Weather []struct {
		Id          int    `json:"id"`
		Main        string `json:"main"`
		Description string `json:"description"`
		Icon        string `json:"icon"`
	} `json:"weather"`
	Sys struct {
		Country string `json:"country"`
		Sunrise int    `json:"sunrise"`
		Sunset  int    `json:"sunset"`
	} `json:"sys"`
}

func (w *WeatherInfoRequest) ToMap(c *config.WidgetConfig) map[string]string {
	result := make(map[string]string)

	result["type"] = string(config.OpenWeatherMap)

	result["city_name"] = w.CityName
	result["temp_actual"] = strconv.FormatFloat(w.Temp.Actual, 'f', 2, 64)
	result["temp_feels_like"] = strconv.FormatFloat(w.Temp.FeelsLike, 'f', 2, 64)
	result["pressure"] = strconv.Itoa(w.Temp.Pressure)
	result["humidity"] = strconv.Itoa(w.Temp.Humidity)

	weather := w.Weather[0]
	result["weather_id"] = strconv.Itoa(weather.Id)
	result["weather_main"] = weather.Main
	result["weather_description"] = weather.Description
	result["weather_icon"] = weather.Icon

	result["country"] = w.Sys.Country
	result["sunrise"] = strconv.Itoa(w.Sys.Sunrise)
	result["sunset"] = strconv.Itoa(w.Sys.Sunset)

	result["units"] = c.Properties["units"]

	return result
}
