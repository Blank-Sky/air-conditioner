FROM node:lts-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app
COPY . .

RUN pnpm config set registry https://registry.npmjs.org/

# 安装所有 workspace 依赖
RUN pnpm install

# 进入子包，单独 build
WORKDIR /app/packages/react
RUN pnpm build

FROM nginx:alpine

ENV AC_NGINX_PORT=80 AC_NGINX_DOMAIN=localhost
COPY --from=builder /app/packages/react/dist /usr/share/nginx/html
EXPOSE 80
