package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/handlers"
	"log"
	"net/http"
	"os"

	"frontporch/sysinfo"
)

func main() {
	http.HandleFunc("/api/sysinfo", func(w http.ResponseWriter, r *http.Request) {
		response := sysinfo.GetSystemInfo()

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	})

	fmt.Println("Server is running at http://0.0.0.0:80")
	log.Fatal(http.ListenAndServe(":80", handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)))
}
