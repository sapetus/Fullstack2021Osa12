FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN CI=true npm test

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3005"]

#FROM nginx:1.20-alpine

#COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html