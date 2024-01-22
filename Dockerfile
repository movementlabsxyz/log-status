# Build Stage
# ------------
# 1. Base image with Node.js
FROM node:19-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy source code
COPY . .

# 5. Build the Next.js application
RUN npm run build

# Production Stage
# ----------------
# 1. Start from the Node.js Alpine image for a smaller final image
FROM node:19-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy the built application from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 4. Start the application
CMD ["npm", "run", "start"]
