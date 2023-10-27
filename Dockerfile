FROM node:20-alpine as build

WORKDIR /app
COPY . /app

RUN npm install && npm run build


FROM nginx:mainline-alpine

COPY --from=build /app/dist /usr/share/nginx/html
