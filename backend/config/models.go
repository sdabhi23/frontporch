package config

type TaskType string

const (
	DaemonTask TaskType = "daemon"
	ServerTask TaskType = "server"
)

type ServerConfig struct {
	Host string `yaml:"host" json:"host"`
	Port int    `yaml:"port" json:"port"`
}

type HttpConfig struct {
	Host string `yaml:"host" json:"host"`
	Port int    `yaml:"port" json:"port"`
}

type WidgetType string

const (
	OpenWeatherMap WidgetType = "open_weather_map"
	LinkChecker    WidgetType = "link_checker"
	Link           WidgetType = "link"
)

type WidgetConfig struct {
	Name       string            `yaml:"name" json:"name"`
	Type       WidgetType        `yaml:"type" json:"type"`
	Properties map[string]string `yaml:"properties" json:"properties"`
}

type Config struct {
	Task    TaskType       `yaml:"task" json:"task"`
	Servers []ServerConfig `yaml:"servers" json:"servers"`
	Widgets []WidgetConfig `yaml:"widgets" json:"widgets"`
	HTTP    HttpConfig     `yaml:"http" json:"http"`
}
