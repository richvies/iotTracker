FROM golang:alpine3.18
WORKDIR /home/app
COPY server.go .

ENV PORT=8080

ENTRYPOINT ["go"]
CMD ["run", "server.go"]