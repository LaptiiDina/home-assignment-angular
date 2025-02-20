# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (assumes you have a build script, e.g. "npm run build")
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Install production dependencies only
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]