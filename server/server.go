package main

import (
	"fmt"
	"net"
	"os"
	"strings"
)

const test_data string = "#867198059727390#MT710#0000#AUTO#1#38#$GPRMC,105721.00,A,2238.3071,N,11401.7575,E,,96.70,250321,,,A*74"

func main() {
	//parseString(test_data)

	portNum := os.Getenv("PORT")
	fmt.Println("Using port " + portNum)

	ln, err := net.Listen("tcp", "0.0.0.0:"+portNum)
	if err != nil {
		fmt.Println("Error creating server: ", err)
		os.Exit(1)
	}
	defer func(ln net.Listener) {
		err := ln.Close()
		if err != nil {
			fmt.Println("Error closing server: ", err)
		}
	}(ln)

	fmt.Printf("Server running at 0.0.0.0:%s\n", portNum)

	for {
		conn, err := ln.Accept()
		if err != nil {
			fmt.Println("Error accepting connection: ", err)
			continue
		}
		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer func(conn net.Conn) {
		err := conn.Close()
		if err != nil {
			fmt.Println("Error closing connection: ", err)
		}
	}(conn)

	remoteAddr := conn.RemoteAddr().String()
	fmt.Println("New client connected from " + remoteAddr)

	buff := make([]byte, 1024)

	for {
		size, err := conn.Read(buff)
		if err != nil {
			fmt.Println("Client disconnected")
			break
		}

		data := buff[:size]
		fmt.Printf("Received data: %s\n", data)

		// Parse string functionality here
		parseString(string(data))

		_, err = conn.Write([]byte("Server received ok"))
		if err != nil {
			return
		}
		fmt.Println("Done\n\n")
	}
}

func parseString(str string) {
	var hFields = strings.Split(str, "#")
	var gFields = strings.Split(str, ",")

	var imei = hFields[1]
	var username = hFields[2]
	var pwd = hFields[3]
	var event = hFields[4]
	var interval = hFields[5]
	var voltage = hFields[6]

	fmt.Println("imei: ", imei, " name: ", username, " pwd: ", pwd, " event: ", event, " interval: ", interval, " voltage: ", voltage)

	var time = gFields[1]
	var status = gFields[2]
	var lat = gFields[3]
	var latDir = gFields[4]
	var lng = gFields[5]
	var lngDir = gFields[6]
	var speed = gFields[7]
	var trackAngle = gFields[8]
	var date = gFields[9]
	var checksum = gFields[12]

	fmt.Println(" Time: ", time, " Status: ", status, " Latitude: ", lat, latDir, "Longitude: ", lng, lngDir, "Speed: ", speed, "Angle: ", trackAngle, "Date: ", date, "Checksum: ", checksum)
}
