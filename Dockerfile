FROM node:lts-alpine AS base
ENV API_HOST=https://timesheet-tracker-backend-320512947253.asia-south1.run.app
# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ ./
RUN corepack enable pnpm
EXPOSE 3000
CMD ["pnpm", "run", "start"]