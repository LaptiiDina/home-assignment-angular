# Stage 1: Build the Angular application
FROM node:18-alpine as builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the Angular build output from the builder stage to Nginx's public folder
COPY --from=builder /app/dist/client/* /usr/share/nginx/html

# Копируем кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
