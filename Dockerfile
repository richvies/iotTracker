FROM node:18-alpine
WORKDIR /home/app
COPY ./server .

ENV PORT=8080

ENTRYPOINT ["node"]
CMD ["server.js"]