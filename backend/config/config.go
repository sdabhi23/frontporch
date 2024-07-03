package config

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

func ParseConfigFile(configFile *string) *Config {
	appConfig := Config{}

	/// Read the YAML file
	data, err := os.ReadFile(*configFile)
	if err != nil {
		log.Fatalf("error reading YAML file: %v", err)
	}

	// Parse the YAML file and store in appConfig
	err = yaml.Unmarshal(data, &appConfig)
	if err != nil {
		log.Fatalf("error parsing YAML file: %v", err)
	}

	return &appConfig
}
