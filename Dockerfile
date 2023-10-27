FROM node:20-alpine as build

WORKDIR /app
COPY . /app

RUN npm install && npm run build


FROM nginx:mainline-alpine
RUN apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html
