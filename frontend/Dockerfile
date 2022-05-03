FROM node:16-slim as base
FROM base as builder

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update \
    && buildDeps="python3 build-essential" \
    && apt-get install -y --no-install-recommends $buildDeps\
    && rm -rf /var/lib/apt/lists/*

# Bundle app source
COPY . .

RUN yarn install && yarn build

FROM base

LABEL maintainer="Plone Foundation <marketing@plone.org>" \
      org.label-schema.name="ploneorg-frontend" \
      org.label-schema.description="Plone.org frontend." \
      org.label-schema.vendor="Plone Foundation" \
      org.label-schema.docker.cmd="docker run -d -p 3000:3000 plone/ploneorg-frontend:latest"

WORKDIR /usr/src

COPY --from=builder /usr/src/app .

WORKDIR /usr/src/app

EXPOSE 3000

CMD ["yarn", "start:prod"]
