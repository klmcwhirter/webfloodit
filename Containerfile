FROM node:20-alpine AS build

WORKDIR /app
COPY . /app

RUN npm install --global corepack@latest && \
corepack enable pnpm

RUN pnpm install && pnpm run build


FROM nginx:mainline-alpine
RUN apk upgrade --no-cache

COPY --from=build /app/dist /usr/share/nginx/html
