package main

import (
	"fmt"
	"net"
	"os"
	"time"
)

const data = "#666198059727390#MT710#0000#AUTO#1#38#$GPRMC,105721.00,A,2238.3071,N,11401.7575,E,,96.70,250321,,,A*74"

func main() {
	client, err := net.Dial("tcp", "35.233.18.208:8080")
	if err != nil {
		fmt.Println("Error connecting to server: ", err)
		os.Exit(1)
	}
	defer func(client net.Conn) {
		err := client.Close()
		if err != nil {
			fmt.Println("Error closing connection: ", err)
		}
	}(client)

	go func() {
		buffer := make([]byte, 1024)
		for {
			n, err := client.Read(buffer)
			if err != nil {
				fmt.Println("Connection closed")
				return
			}
			fmt.Printf("Received data: %s\n", string(buffer[:n]))
		}
	}()

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	for range ticker.C {
		_, err := client.Write([]byte(data))
		if err != nil {
			fmt.Println("Error sending data: ", err)
			break
		}
	}
}
