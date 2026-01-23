FROM node:20-bookworm-slim as base
FROM base as builder

RUN apt-get update \
    && buildDeps="python3 build-essential git ca-certificates" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=node .yarnrc.yml Makefile package.json mrs.developer.json jsconfig.json yarn.lock /build/
COPY --chown=node .yarn /build/.yarn
RUN corepack enable
USER node
WORKDIR /build

RUN mkdir -p src/addons && make install

COPY --chown=node . /build/
RUN yarn build

FROM base

LABEL maintainer="Plone Foundation <marketing@plone.org>" \
      org.label-schema.name="plone.org-frontend" \
      org.label-schema.description="Plone.org Site frontend image." \
      org.label-schema.vendor="Plone Foundation"

RUN apt-get update \
    && buildDeps="busybox" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && busybox --install -s \
    && rm -rf /var/lib/apt/lists/*

USER node
COPY --from=builder /build/ /app/
COPY --chown=node public/.well-known /app/build/public/.well-known/

WORKDIR /app
EXPOSE 3000
CMD ["yarn", "start:prod"]
