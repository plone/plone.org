ARG PLONE_VERSION=6.0.6
FROM plone/plone-backend:${PLONE_VERSION}
ARG PLONE_VERSION=6.0.6

LABEL maintainer="Plone Foundation <marketing@plone.org>" \
      org.label-schema.name="plone.org-backend" \
      org.label-schema.description="Plone.org Site backend image." \
      org.label-schema.vendor="Plone Foundation"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN sed "s/PLONE_VERSION/${PLONE_VERSION}/g" constraints-template.txt > constraints.txt

RUN --mount=type=cache,id=ploneorg-pip,target=/root/.cache/pip \
    ./bin/pip install mxdev \
    && mv requirements-docker.txt requirements.txt \
    && ./bin/mxdev -c mx.ini \
    && ./bin/pip install -r requirements-mxdev.txt \
    && chown -R plone: /app
