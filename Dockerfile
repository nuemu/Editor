FROM node:18.2.0-alpine3.14

RUN apk add git

RUN mkdir src
WORKDIR /src