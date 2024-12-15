FROM flyio/litefs:0.5 AS litefs
FROM oven/bun:slim AS bun

COPY . /app

# Set up LiteFS binary
COPY --from=litefs /usr/local/bin/litefs /usr/local/bin/litefs
# Copy our LiteFS configuration
ADD litefs.yml /etc/litefs.yml
# Ensure /app/database & /var/lib/litefs directories exists before mounting with LiteFS
RUN mkdir -p /app/database /var/lib/litefs

FROM bun AS development-dependencies-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN bun i --frozen-lockfile

FROM bun AS production-dependencies-env
COPY ./package.json bun.lockb /app/
WORKDIR /app
RUN bun i --production

FROM bun AS build-env
COPY ./package.json bun.lockb /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

FROM bun
RUN apt update -y && apt install -y ca-certificates fuse3 sqlite3

COPY ./package.json bun.lockb drizzle.config.ts ./drizzle server.ts /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

# Run LiteFS as the entrypoint so it can execute "bun" as a subprocess.
ENTRYPOINT litefs mount
