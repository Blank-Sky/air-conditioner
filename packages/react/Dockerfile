FROM node:lts-alpine as builder

RUN npm install -g pnpm

WORKDIR /app
COPY . .

# 设置淘宝镜像源 + 安装依赖
RUN pnpm config set registry https://registry.npmmirror.com && \
    pnpm install && \
    pnpm --filter react build

FROM nginx:alpine

ENV AC_NGINX_PORT=8081 AC_NGINX_DOMAIN=localhost
COPY --from=builder /app/packages/react/dist /usr/share/nginx/html
EXPOSE 8081
