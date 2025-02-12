FROM node:lts-slim as build-step

WORKDIR /

COPY package*.json ./

RUN npm install

# Add all files
COPY . ./

RUN npm run build