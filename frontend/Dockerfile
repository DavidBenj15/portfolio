# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Optional: Add custom nginx config to remove 404s for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf
