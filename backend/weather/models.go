package weather

import (
	"fmt"
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

func (w *WeatherInfoRequest) ToMap() map[string]string {
	result := make(map[string]string)

	result["type"] = string(config.OpenWeatherMap)

	result["city_name"] = w.CityName
	result["temp_actual"] = strconv.FormatFloat(w.Temp.Actual, 'f', 2, 64)
	result["temp_feels_like"] = strconv.FormatFloat(w.Temp.FeelsLike, 'f', 2, 64)
	result["pressure"] = strconv.Itoa(w.Temp.Pressure)
	result["humidity"] = strconv.Itoa(w.Temp.Humidity)

	for i, weather := range w.Weather {
		result[fmt.Sprintf("weather_%d_id", i)] = strconv.Itoa(weather.Id)
		result[fmt.Sprintf("weather_%d_main", i)] = weather.Main
		result[fmt.Sprintf("weather_%d_description", i)] = weather.Description
		result[fmt.Sprintf("weather_%d_icon", i)] = weather.Icon
	}

	result["country"] = w.Sys.Country
	result["sunrise"] = strconv.Itoa(w.Sys.Sunrise)
	result["sunset"] = strconv.Itoa(w.Sys.Sunset)

	return result
}
