package weather

import (
	"encoding/json"
	"fmt"
	"frontporch/config"
	"io"
	"net/http"
	"time"
)

func GetWeatherInfo(widgets *[]config.WidgetConfig) (*[]map[string]string, error) {
	var weatherInfoList []map[string]string

	client := http.Client{
		Timeout: 3 * time.Second,
	}

	for _, widget := range *widgets {

		if widget.Type == config.OpenWeatherMap {
			var weatherInfoRequest WeatherInfoRequest

			url := fmt.Sprintf("https://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&units=%s&appid=%s", widget.Properties["lat"], widget.Properties["lon"], widget.Properties["units"], widget.Properties["apikey"])

			fmt.Println(url)

			req, _ := http.NewRequest("GET", url, nil)
			resp, err := client.Do(req)
			if err != nil {
				fmt.Printf("Error performing GET request: %v\n", err)
				return nil, err
			}
			defer resp.Body.Close()

			body, err := io.ReadAll(resp.Body)
			if err != nil {
				fmt.Printf("Error reading response body: %v\n", err)
				return nil, err
			}

			err = json.Unmarshal(body, &weatherInfoRequest)
			if err != nil {
				fmt.Printf("Error unmarshaling JSON: %v\n", err)
				return nil, err
			}

			weather := weatherInfoRequest.ToMap()

			weatherInfoList = append(weatherInfoList, weather)
			fmt.Println(weatherInfoRequest)
			fmt.Println(weather)
		}
	}

	return &weatherInfoList, nil
}
