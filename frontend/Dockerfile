# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build && npm run export

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html

# Optional: Add custom nginx config to remove 404s for SPA routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf
