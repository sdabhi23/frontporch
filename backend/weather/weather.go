package weather

import (
	"encoding/json"
	"errors"
	"fmt"
	"frontporch/config"
	"io"
	"net/http"
	"time"
)

func GetWeatherInfo(widget *config.WidgetConfig) (*map[string]string, error) {
	client := http.Client{
		Timeout: 3 * time.Second,
	}

	var weatherInfoRequest WeatherInfoRequest

	url := fmt.Sprintf("https://api.openweathermap.org/data/2.5/weather?lat=%s&lon=%s&units=%s&appid=%s", widget.Properties["lat"], widget.Properties["lon"], widget.Properties["units"], widget.Properties["apikey"])

	req, _ := http.NewRequest("GET", url, nil)
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error performing GET request: %v\n", err)
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		fmt.Printf("Received non 200 response code: %v\n", resp.StatusCode)
		return nil, errors.New(fmt.Sprintf("Received a non 200 response code from Open Weather Map API: %v", resp.StatusCode))
	}

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

	weather := weatherInfoRequest.ToMap(widget)

	return &weather, nil
}
