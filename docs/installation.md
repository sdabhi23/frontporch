# Getting Started

## Download

Pre-built binaries for the following platforms are being published for every version on [Github Releases](https://github.com/sdabhi23/frontporch/releases).

|                        | Linux | Windows | MacOS (darwin) | FreeBSD |
| ---------------------- | :---: | :-----: | :------------: | :-----: |
| **amd64 (64-bit)**     |  ✅   |   ✅    |       ✅       |   ✅    |
| **386 (32-bit)**       |  ✅   |   ✅    |       ❌       |   ✅    |
| **arm64 (64-bit arm)** |  ✅   |   ✅    |       ✅       |   ✅    |
| **arm (32-bit arm)**   |  ✅   |   ✅    |       ❌       |   ✅    |

Download the correct binary for your platform and create a server / daemon config file.

## Configuration

Configure FrontPorch using the config.yaml file. Here’s an example configuration:

```yaml
# config.yaml
task: server # can be server / daemon
http:
  port: 8080
  host: 0.0.0.0
  static_file_dir: ../frontend/dist # only required for server mode
# sections below are only required for server mode
servers:
  - host: server-1 # ip or dns name of your other server
    port: 8080
  - host: server-2
    port: 8080
  - host: server-3
    port: 8000
widgets:
  # open weather map widget to show weather on the dashboard
  - name: Bangalore
    type: open_weather_map
    properties:
      apikey: <---insert-api-key-here----> # api key generated from OWM
      units: metric
      lat: 12.9116
      lon: 77.6839
```

## Start FrontPorch

Run the program using the following command:

```bash
./frontporch --config-file=config.yaml
```

If you are running the server, the dashboard will be available at the port configured in the config file. If you are running the daemon, the APIs for this machine will now be available on the configured port.