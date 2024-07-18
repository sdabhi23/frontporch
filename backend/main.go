package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"

	"frontporch/config"
	"frontporch/sysinfo"
	"frontporch/weather"
)

func main() {

	var configPath string
	flag.StringVar(&configPath, "config-file", "", "YAML file for config management")
	flag.Parse()

	appConfig := config.ParseConfigFile(&configPath)

	if appConfig.Task != config.DaemonTask && appConfig.Task != config.ServerTask {
		log.Fatalf("Invalid task: %s", appConfig.Task)
		os.Exit(1)
	}

	if appConfig.Task == config.ServerTask {
		fs := http.FileServer(http.Dir(appConfig.HTTP.StaticFileDir))
		http.Handle("/", fs)
	}

	http.HandleFunc("/api/sysinfo", func(w http.ResponseWriter, r *http.Request) {
		var response []sysinfo.SysInfo

		switch appConfig.Task {
		case config.DaemonTask:
			response = sysinfo.GetDaemonSystemInfo()
		case config.ServerTask:
			response = sysinfo.GetServerSystemInfo(&appConfig.Servers)
		default:
			response = []sysinfo.SysInfo{}
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	})

	http.HandleFunc("/api/config", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(*appConfig)
	})

	http.HandleFunc("/api/widgets", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		w.Header().Set("Content-Type", "application/json")
		var response []map[string]string
		weather, err := weather.GetWeatherInfo(&appConfig.Widgets)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		response = append(response, *weather...)
		json.NewEncoder(w).Encode(response)
	})

	serverAddress := fmt.Sprintf("%s:%d", appConfig.HTTP.Host, appConfig.HTTP.Port)
	fmt.Printf("Server is running at http://%s\n", serverAddress)
	if err := http.ListenAndServe(serverAddress, handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)); err != nil {
		log.Fatal(err, "http server startup failed")
	}
}
