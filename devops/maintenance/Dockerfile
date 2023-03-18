ARG PLONE_VERSION=6.0.2
FROM plone/server-builder:${PLONE_VERSION}

LABEL maintainer="Plone Foundation <marketing@plone.org>" \
      org.label-schema.name="plone.org-backend" \
      org.label-schema.description="Plone.org Site backend image." \
      org.label-schema.vendor="Plone Foundation"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN ./bin/pip install mxdev \
    && mv requirements-docker.txt requirements.txt \
    && ./bin/mxdev -c mx.ini \
    && ./bin/pip install -r requirements-mxdev.txt \
    && chown -R plone: /app
