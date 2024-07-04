package sysinfo

import (
	"encoding/json"
	"fmt"
	"frontporch/config"
	"io"
	"net/http"
	"regexp"
	"strings"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/host"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
)

func GetDaemonSystemInfo() []SysInfo {
	hostStat, _ := host.Info()
	cpuStat, _ := cpu.Info()
	vmStat, _ := mem.VirtualMemory()
	diskStat, _ := disk.Usage("/")

	info := new(SysInfo)
	info.Host = HostInfo{
		Uptime:          hostStat.Uptime,
		UptimeHours:     float64(hostStat.Uptime) / 3600,
		Hostname:        hostStat.Hostname,
		OS:              hostStat.OS,
		Platform:        hostStat.Platform,
		PlatformVersion: hostStat.PlatformVersion,
		KernelVersion:   hostStat.KernelVersion,
		KernelArch:      hostStat.KernelArch,
	}
	info.CPU = CpuInfo{
		Model:  cpuStat[0].ModelName,
		Vendor: cpuStat[0].VendorID,
		Family: cpuStat[0].Family,
	}
	info.CPU.PhysicalCores, _ = cpu.Counts(false)
	info.CPU.LogicalCores, _ = cpu.Counts(true)
	info.RAM = UsageStat{
		Total:       vmStat.Total / 1024 / 1024,
		Available:   vmStat.Available / 1024 / 1024,
		Used:        vmStat.Used / 1024 / 1024,
		UsedPercent: vmStat.UsedPercent,
	}
	info.Disk = UsageStat{
		Total:       diskStat.Total / 1024 / 1024,
		Available:   diskStat.Free / 1024 / 1024,
		Used:        diskStat.Used / 1024 / 1024,
		UsedPercent: diskStat.UsedPercent,
	}
	interfaceList, _ := net.Interfaces()
	info.IpAddresses = []string{}

	// regex to match cidr ipv4 address
	cidrIP := regexp.MustCompile(`\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/\d{1,2}`)

	for _, netInterface := range interfaceList {
		for _, addr := range netInterface.Addrs {
			match := cidrIP.MatchString(addr.Addr)
			if match {
				info.IpAddresses = append(info.IpAddresses, strings.Split(addr.Addr, "/")[0])
			}
		}
	}

	var output []SysInfo
	output = append(output, *info)

	return output
}

func GetServerSystemInfo(servers *[]config.ServerConfig) []SysInfo {
	var output []SysInfo

	for _, server := range *servers {
		url := fmt.Sprintf("http://%s:%d/api/sysinfo", server.Host, server.Port)

		resp, err := http.Get(url)
		if err != nil {
			fmt.Printf("Error performing GET request: %v\n", err)
			return nil
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			fmt.Printf("Error reading response body: %v\n", err)
			return nil
		}

		var sysInfo []SysInfo
		err = json.Unmarshal(body, &sysInfo)
		if err != nil {
			fmt.Printf("Error unmarshaling JSON: %v\n", err)
			return nil
		}
		output = append(output, sysInfo...)
	}

	selfSysInfo := GetDaemonSystemInfo()
	output = append(output, selfSysInfo...)

	return output
}
