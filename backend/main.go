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
)

func main() {
	// parse all the flags passed to the program in main()
	// use the flag package to parse the flags
	appConfigFile := flag.String("config-file", "", "config file required to setup the server")
	flag.Parse()

	appConfig := config.ParseConfigFile(appConfigFile)

	fs := http.FileServer(http.Dir("../frontend/dist"))
	http.Handle("/", fs)

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

	serverAddress := fmt.Sprintf("%s:%d", appConfig.HTTP.Host, appConfig.HTTP.Port)
	fmt.Printf("Server is running at http://%s", serverAddress)
	log.Fatal(http.ListenAndServe(serverAddress, handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)))
}
