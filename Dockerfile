FROM oven/bun:1.3.13 AS build

WORKDIR /app

ARG PUBLIC_IOT_API_BASE_URL=/api
ENV PUBLIC_IOT_API_BASE_URL=$PUBLIC_IOT_API_BASE_URL

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/build /srv

EXPOSE 80
