package sysinfo

import "frontporch/config"

type UsageStat struct {
	Total       uint64  `json:"total"`
	Available   uint64  `json:"available"`
	Used        uint64  `json:"used"`
	UsedPercent float64 `json:"used_percent"`
}

type CpuInfo struct {
	PhysicalCores int    `json:"physical_cores"`
	LogicalCores  int    `json:"logical_cores"`
	Model         string `json:"model"`
	Vendor        string `json:"vendor"`
	Family        string `json:"family"`
}

type HostInfo struct {
	Uptime          uint64  `json:"uptime"`
	UptimeHours     float64 `json:"uptime_hours"`
	Hostname        string  `json:"hostname"`
	OS              string  `json:"os"`
	Platform        string  `json:"platform"`
	PlatformVersion string  `json:"platform_version"`
	KernelVersion   string  `json:"kernel_version"`
	KernelArch      string  `json:"kernel_arch"`
}

type StatusInfo string

const (
	Online  StatusInfo = "online"
	Offline StatusInfo = "offline"
)

type SysInfo struct {
	Host        HostInfo   `json:"host"`
	CPU         CpuInfo    `json:"cpu"`
	RAM         UsageStat  `json:"ram"`
	Disk        UsageStat  `json:"disk"`
	IpAddresses []string   `json:"ip_addresses"`
	Status      StatusInfo `json:"status"`
}

func NewOfflineServer(server config.ServerConfig) *SysInfo {
	return &SysInfo{
		Status: Offline,
		Host: HostInfo{
			Hostname: server.Host,
		},
	}
}