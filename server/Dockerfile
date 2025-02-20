# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

WORKDIR /usr/src/app

# Install TypeORM and ts-node globally
RUN npm install -g ts-node typeorm

# Copy necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env ./
COPY --from=builder /usr/src/app/ormconfig.json ./
COPY --from=builder /usr/src/app/migrations ./migrations

# Expose the application port
EXPOSE 3000

# Run migrations before starting the server
CMD ["sh", "-c", "npx typeorm migration:run -d dist/data-source.js && npm run start:prod"]
