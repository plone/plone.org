ARG PLONE_VERSION=6.0.15
FROM plone/plone-backend:${PLONE_VERSION}
ARG PLONE_VERSION

LABEL maintainer="Plone Foundation <marketing@plone.org>" \
      org.label-schema.name="plone.org-backend" \
      org.label-schema.description="Plone.org Site backend image." \
      org.label-schema.vendor="Plone Foundation"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN  

RUN --mount=type=cache,id=ploneorg-pip,target=/root/.cache/pip \
    echo "-c https://dist.plone.org/release/${PLONE_VERSION}/constraints.txt" > constraints-kgs.txt \
    mkdir /data/relstorage-cache /data/blob-cache \
    && ./bin/pip install mxdev \
    && mv requirements-docker.txt requirements.txt \
    && ./bin/mxdev -c mx.ini \
    && ./bin/pip install -r requirements-mxdev.txt \
    && chown -R plone: /app \
    && mv conf/relstorage.conf etc/relstorage.conf