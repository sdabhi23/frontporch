package main

import (
	"embed"
	"encoding/json"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"

	"frontporch/config"
	"frontporch/sysinfo"
	"frontporch/utils"
	"frontporch/weather"
)

// subFS is a helper function to serve files from a subdirectory of an embed.FS
func subFS(fsys embed.FS, dir string) http.FileSystem {
	sub, err := fs.Sub(fsys, dir)
	if err != nil {
		log.Fatal(err)
	}
	return http.FS(sub)
}

//go:embed static/*
var staticFiles embed.FS

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
		fs := http.FileServer(subFS(staticFiles, "static"))
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

		utils.JSONResponse(w, response)
	})

	http.HandleFunc("/api/config", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(*appConfig)

		utils.JSONResponse(w, *appConfig)
	})

	http.HandleFunc("/api/widgets", func(w http.ResponseWriter, r *http.Request) {
		var response []map[string]string

		// loop over widget configs
		for _, widget := range appConfig.Widgets {
			switch widget.Type {
			case config.OpenWeatherMap:
				weather, err := weather.GetWeatherInfo(&widget)
				if err != nil {
					errMap := map[string]string{
						"message": err.Error(),
					}
					utils.JSONError(w, errMap, http.StatusInternalServerError)
					return
				}
				response = append(response, *weather)
			default:
				errMap := map[string]string{
					"message": fmt.Sprintf("widget type handling not implemented: %v", widget.Type),
				}
				utils.JSONError(w, errMap, http.StatusInternalServerError)
			}
		}
		utils.JSONResponse(w, response)
	})

	serverAddress := fmt.Sprintf("%s:%d", appConfig.HTTP.Host, appConfig.HTTP.Port)
	fmt.Printf("Server is running at http://%s\n", serverAddress)
	if err := http.ListenAndServe(serverAddress, handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)); err != nil {
		log.Fatal(err, "http server startup failed")
	}
}
