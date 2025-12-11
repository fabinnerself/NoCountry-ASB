# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

# Copy backend files
COPY backend/package*.json ./backend/
COPY backend/prisma ./backend/prisma/

WORKDIR /app/backend

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

# Copy package files
COPY backend/package*.json ./backend/

WORKDIR /app/backend

# Install only production dependencies
RUN npm ci --only=production

# Copy Prisma schema and migrations
COPY backend/prisma ./prisma/

# Generate Prisma Client for production
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/backend/dist ./dist

# Create uploads directory
RUN mkdir -p uploads

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app/backend

USER nodejs

EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["npm", "start"]
