FROM node:20-alpine as build

WORKDIR /app

COPY murakami/package*.json ./murakami/
COPY murakami/ ./murakami/

WORKDIR /app/murakami

RUN npm ci
RUN npm run build

FROM nginx:alpine

# Vite builds to /app/murakami/dist
COPY --from=build /app/murakami/dist /usr/share/nginx/html

EXPOSE 3000

RUN echo 'server { \
    listen 3000; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]