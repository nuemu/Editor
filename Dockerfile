FROM node:18.6.0-alpine3.15

RUN apk add git

RUN mkdir src
WORKDIR /src