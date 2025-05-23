#syntax:docker/dockerfile:1

FROM node:18.12.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production --legacy-peer-deps

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]