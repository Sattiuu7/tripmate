# Multi-stage Dockerfile for TripMate Unified Production Deployment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root, backend and frontend package files
COPY package.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm --prefix backend install
RUN npm --prefix frontend install

# Copy source files
COPY backend ./backend
COPY frontend ./frontend

# Build frontend production bundle
RUN npm --prefix frontend run build

# Production runtime stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy node modules and built assets
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY package.json ./

EXPOSE 5000

CMD ["node", "backend/src/server.js"]
