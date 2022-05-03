FROM plone/plone-backend:6.0.0a4

LABEL maintainer="Plone Foundation <marketing@plone.org>" \
      org.label-schema.name="ploneorg-backend" \
      org.label-schema.description="Plone.org Backend." \
      org.label-schema.vendor="Plone Foundation" \
      org.label-schema.docker.cmd="docker run -d -p 8080:8080 plone/ploneorg-backend:latest"

# Add local code
COPY src /app/src
RUN  bin/pip install "pas.plugins.authomatic==1.0b2" \
     && bin/pip install -e "src/ploneorg.core"
