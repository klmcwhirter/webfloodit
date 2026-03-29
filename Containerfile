FROM node:20-alpine AS build

WORKDIR /app
COPY . /app

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh

RUN <<EOF
source ~/.shrc
rm -fr node_modules/
pnpm install
pnpm run build
EOF

FROM nginx:mainline-alpine

RUN apk upgrade --no-cache

COPY ./etc/nginx/ /etc/nginx/
COPY ./etc/docker-entrypoint.d/*.sh /docker-entrypoint.d/

COPY --from=build /app/dist /usr/share/nginx/html
