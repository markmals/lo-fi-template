FROM flyio/litefs:0.5 AS litefs
FROM node:jod-slim AS node

COPY . /app

# Set up LiteFS binary
COPY --from=litefs /usr/local/bin/litefs /usr/local/bin/litefs
# Copy our LiteFS configuration
ADD litefs.yml /etc/litefs.yml
# Ensure /app/database & /var/lib/litefs directories exists before mounting with LiteFS
RUN mkdir -p /app/database /var/lib/litefs

FROM node AS development-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci

FROM node AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node AS build-env
COPY ./package.json package-lock.json /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node
RUN apt update -y && apt install -y ca-certificates fuse3 sqlite3

# Need to copy DrizzleKit config & migrations so we can run them on start up
COPY ./package.json ./package-lock.json ./drizzle.config.ts ./drizzle ./scripts/start.js /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

# Run LiteFS as the entrypoint so it can execute "bun" as a subprocess.
ENTRYPOINT litefs mount
