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
	Host          string `yaml:"host" json:"host"`
	Port          int    `yaml:"port" json:"port"`
	StaticFileDir string `yaml:"static_file_dir" json:"static_file_dir"`
}

type WidgetType string

const (
	OpenWeatherMap WidgetType = "OPEN_WEATHER_MAP"
	LinkChecker    WidgetType = "LINK_CHECKER"
	Link           WidgetType = "LINK"
)

type WidgetConfig struct {
	Name       string            `yaml:"name" json:"name"`
	Type       WidgetType        `yaml:"type" json:"type"`
	URL        string            `yaml:"url" json:"url"`
	Properties map[string]string `yaml:"properties" json:"properties"`
}

type Config struct {
	Task    TaskType       `yaml:"task" json:"task"`
	Servers []ServerConfig `yaml:"servers" json:"servers"`
	Widgets []WidgetConfig `yaml:"widgets" json:"widgets"`
	HTTP    HttpConfig     `yaml:"http" json:"http"`
}
