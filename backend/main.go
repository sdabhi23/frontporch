package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/gorilla/handlers"
	"github.com/spf13/cobra"

	"frontporch/config"
	"frontporch/sysinfo"
)

var appConfig = &config.Config{}

func SetupCommands() *cobra.Command {
	var configPath string
	cmd := &cobra.Command{
		Use:               "frontporch",
		Short:             "FrontPorch is a server monitoring tool",
		PersistentPreRunE: commandSetup(&configPath),
		SilenceUsage:      true,
		RunE: func(cmd *cobra.Command, args []string) error {
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
			go func() {
				if err := http.ListenAndServe(serverAddress, handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)); err != nil {
					log.Fatal(err, "http server startup failed")
				}
			}()
			<-cmd.Context().Done()
			fmt.Println("http server shutdown initiated")
			return nil
		},
	}
	cmd.PersistentFlags().StringVar(&configPath, "config-file", "", "YAML file for config management")
	return cmd
}

func commandSetup(configPath *string) func(*cobra.Command, []string) error {
	return func(command *cobra.Command, strings []string) (err error) {
		appConfig = config.ParseConfigFile(configPath)
		return
	}
}

func main() {
	ctx, _ := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	cmd := SetupCommands()
	if err := cmd.ExecuteContext(ctx); err != nil {
		os.Exit(1)
	}
}
