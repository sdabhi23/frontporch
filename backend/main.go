package main

import (
	"encoding/json"
	"fmt"
	"regexp"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/host"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/shirou/gopsutil/v4/net"
)

type usageStat struct {
	Total       uint64  `json:"total"`
	Available   uint64  `json:"available"`
	Used        uint64  `json:"used"`
	UsedPercent float64 `json:"used_percent"`
}

type cpuInfo struct {
	Cores int    `json:"cores"`
	Model string `json:"model"`
}

// SysInfo saves the basic system information
type SysInfo struct {
	Host          host.InfoStat       `json:"host"`
	CPU           cpuInfo             `json:"cpu"`
	RAM           usageStat           `json:"ram"`
	Disk          usageStat           `json:"disk"`
	IpAddresses   []string            `json:"ip_addresses"`
	NetInterfaces []net.InterfaceStat `json:"net_interfaces"`
}

func RemoveIndex(s []net.InterfaceStat, index int) []net.InterfaceStat {
	return append(s[:index], s[index+1:]...)
}

func main() {
	hostStat, _ := host.Info()
	cpuStat, _ := cpu.Info()
	vmStat, _ := mem.VirtualMemory()
	diskStat, _ := disk.Usage("/")

	info := new(SysInfo)
	info.Host = *hostStat
	info.CPU = cpuInfo{
		Cores: int(cpuStat[0].Cores),
		Model: cpuStat[0].ModelName,
	}
	info.RAM = usageStat{
		Total:       vmStat.Total / 1024 / 1024,
		Available:   vmStat.Available / 1024 / 1024,
		Used:        vmStat.Used / 1024 / 1024,
		UsedPercent: vmStat.UsedPercent,
	}
	info.Disk = usageStat{
		Total:       diskStat.Total / 1024 / 1024,
		Available:   diskStat.Free / 1024 / 1024,
		Used:        diskStat.Used / 1024 / 1024,
		UsedPercent: diskStat.UsedPercent,
	}
	interfaceList, _ := net.Interfaces()
	info.NetInterfaces = interfaceList[:0]
	info.IpAddresses = []string{}

	// regex to match cidr ipv4 address
	cidrIP := regexp.MustCompile(`\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/\d{1,2}`)

	for _, netInterface := range interfaceList {
		ipList := []string{}

		for _, addr := range netInterface.Addrs {
			match := cidrIP.MatchString(addr.Addr)
			if match {
				ipList = append(ipList, addr.Addr)
				info.IpAddresses = append(info.IpAddresses, addr.Addr)
			}
		}

		if len(ipList) > 0 {
			info.NetInterfaces = append(info.NetInterfaces, netInterface)
		}
	}

	infoJson, _ := json.Marshal(info)

	fmt.Println(string(infoJson))
	fmt.Println("Full CPU Info:")
	fmt.Println(cpuStat)
}
