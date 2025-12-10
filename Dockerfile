# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy backend directory
COPY backend/ ./backend/

WORKDIR /app/backend

# Install all dependencies (including dev dependencies) for building
RUN npm install

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy backend directory
COPY backend/ ./backend/

WORKDIR /app/backend

# Install only production dependencies
RUN npm install --only=production

# Copy built application from builder stage
COPY --from=builder /app/backend/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Create logs directory with proper permissions
RUN mkdir -p logs && chown -R nodejs:nodejs logs

USER nodejs

EXPOSE 10000

CMD ["npm", "start"]
