FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies in a separate layer to reuse cache
FROM base AS deps

RUN corepack enable
COPY package.json pnpm-lock.yaml ./

# Use cache for the pnpm store to speed up subsequent builds
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

# Build stage for compiling the app
FROM base AS build

RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Final image for production
FROM base AS prod

WORKDIR /app
# Copy only necessary files for runtime
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
ENV NODE_ENV production
CMD ["node", "./dist/app.js"]
