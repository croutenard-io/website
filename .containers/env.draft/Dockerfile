# +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# ---               HUGO BASE CONTAINER IMAGE             --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ #

ARG ALPINE_OCI_IMAGE_TAG=${ALPINE_OCI_IMAGE_TAG:-"3.16"}
ARG GOLANG_VERSION=${GOLANG_VERSION:-"1.18.3"}
FROM golang:$GOLANG_VERSION-alpine$ALPINE_OCI_IMAGE_TAG AS hugo_dev_base

ARG ALPINE_OCI_IMAGE_TAG=${ALPINE_OCI_IMAGE_TAG:-'latest'}

ARG GOLANG_VERSION=1.18.3
ENV GOLANG_VERSION=${GOLANG_VERSION}

ARG HUGO_VERSION=0.100.2
ENV HUGO_VERSION=$HUGO_VERSION


RUN echo "GOLANG_VERSION=[${GOLANG_VERSION}] and HUGO_VERSION=[${HUGO_VERSION}]"
USER root
# [build-base] because the hugo installation requires gcc and [build-base] package contains the proper gcc
# RUN echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #"
# RUN echo "# --- --- --- --- Contenu [/etc/apk/repositories]"
# RUN echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #"
# RUN export APK_CONFIG_FILE=$(cat /etc/apk/repositories) && echo "${APK_CONFIG_FILE}"
# RUN echo "# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #"
# RUN exit 67
# -- fix proposed at https://github.com/gliderlabs/docker-alpine/issues/386#issuecomment-376784936
# RUN echo -e "http://nl.alpinelinux.org/alpine/v$ALPINE_OCI_IMAGE_TAG/main\nhttp://nl.alpinelinux.org/alpine/v$ALPINE_OCI_IMAGE_TAG/community" > /etc/apk/repositories
# RUN apk update && echo "debug point" && exit 1
RUN apk update && apk add curl git tree tar bash build-base


# +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# ---               CREATE CONTAINER USER            --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ +++ #

ARG POKUS_USER_NAME=pokus
ENV POKUS_USER_NAME=$POKUS_USER_NAME

# group name defaults to user name
ARG POKUS_USER_GRP_NAME=$POKUS_USER_NAME
ENV POKUS_USER_GRP_NAME=$POKUS_USER_GRP_NAME


ARG POKUS_USER_UID=1000
ENV POKUS_USER_UID=$POKUS_USER_UID

ARG POKUS_USER_GID=1000
ENV POKUS_USER_GID=$POKUS_USER_GID

RUN mkdir -p /pokus.io/hugo/src/

WORKDIR /pokus.io/

COPY create.admin.user.sh .
RUN chmod +x ./create.admin.user.sh && ./create.admin.user.sh


# Now [/pokus.io/] must be owned by the POKUS_USER

# RUN chown -R ${POKUS_USER_NAME}:${POKUS_USER_NAME} /pokus.io
RUN chown -R :${POKUS_USER_GRP_NAME} /pokus.io

# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# ---              CHECKING GOLANG VERSION                --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #

RUN export PATH=$PATH:/usr/local/go/bin && go version

# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# ---                   INSTALLING HUGO                   --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
RUN go version
COPY install-hugo-extended.sh .
RUN chmod +x ./install-hugo-extended.sh
RUN ./install-hugo-extended.sh
RUN echo "What is Golang version ? [$(go version)]"
RUN go version
RUN echo "What is GOPATH ? [${GOPATH}]"
RUN echo "Is Hugo properly installed ?"
# RUN export PATH=$PATH:/usr/local/go/bin && hugo version && hugo env
RUN export PATH=$PATH:$GOPATH && go version && ls -alh $GOPATH/bin/ && hugo version && hugo env
RUN go version && hugo version && hugo env

FROM hugo_dev_base AS hugo_dev


# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# ---                  LABELS                         --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# What informations do i want in the label metadata ?
#    build-date
#    name
#    description
#    url
#    vcs-ref
#    docker.cmd
#
# ---
# https://medium.com/@chamilad/lets-make-your-docker-image-better-than-90-of-existing-ones-8b1e5de950d
#
# ---
#

ARG GIT_COMMIT_ID=${GIT_COMMIT_ID}
ARG CICD_BUILD_ID=${CICD_BUILD_ID}
# export CICD_BUILD_TIMESTAMP=$(date --rfc-3339 seconds)
ARG CICD_BUILD_TIMESTAMP=${CICD_BUILD_TIMESTAMP}
ARG QUAY_OCI_IMAGE_TAG=${QUAY_OCI_IMAGE_TAG}

LABEL io.pokus.oci.image.gun="pokusio/jb-lasselle-whoami-web:${QUAY_OCI_IMAGE_TAG}-dev"
LABEL io.pokus.oci.base.image="golang:${GOLANG_VERSION}-alpine${ALPINE_OCI_IMAGE_TAG}"
LABEL io.pokus.golang.version="${GOLANG_VERSION}"
LABEL io.pokus.hugo.version="${HUGO_VERSION}"
LABEL io.pokus.git.commit.id="${GIT_COMMIT_ID}"
LABEL io.pokus.cicd.build.id="${CICD_BUILD_ID}"
LABEL io.pokus.cicd.build.timestamp="${CICD_BUILD_TIMESTAMP}"
LABEL io.pokus.website="https://jean-baptiste-lasselle.github.io/whoami-web"
# LABEL io.pokus.scm.type="gitlab.com"
# LABEL io.pokus.scm.type="gitea.com"
LABEL io.pokus.scm.type="github.com"
LABEL io.pokus.scm.repo="https://github.com/Jean-Baptiste-Lasselle/whoami-web"
LABEL io.pokus.scm.github.org="https://github.com/Jean-Baptiste-Lasselle"
LABEL io.pokus.author="Jean-Baptiste Lasselle <jean.baptiste.lasselle.pokus@gmail.com>"
LABEL io.pokus.maintainer="Jean-Baptiste Lasselle <jean.baptiste.lasselle.pokus@gmail.com>"


ARG HUGO_BASE_URL=https://jean-baptiste-lasselle.github.io/whoami-web/
ENV HUGO_BASE_URL=$HUGO_BASE_URL
ARG HUGO_SERVER_BIND_ADDR=0.0.0.0
ENV HUGO_SERVER_BIND_ADDR=$HUGO_SERVER_BIND_ADDR
ARG HUGO_SERVER_PORT_NUMBER=1313
ENV HUGO_SERVER_PORT_NUMBER=$HUGO_SERVER_PORT_NUMBER
ARG HUGO_SERVER_OUTBOUND_PORT_NUMBER=3112
ENV HUGO_SERVER_OUTBOUND_PORT_NUMBER=$HUGO_SERVER_OUTBOUND_PORT_NUMBER
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# ---                  HUGO SERVER RUNTIME                --- #
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
# Of course you would not ever distribute the hugo dev server in
# production, this is just an example... (And I do what I want to
# do, with my production env., because it mine: the pint is how do
#  you choose that)
# --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- #
COPY serve.sh /pokus.io/hugo/
COPY hugo.build.sh /pokus.io/hugo/
RUN chmod a+x /pokus.io/hugo/*.sh
EXPOSE 1313

USER $POKUS_USER_NAME

WORKDIR /pokus.io/hugo/src/
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["/pokus.io/hugo/serve.sh"]
