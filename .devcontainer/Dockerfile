FROM python:3.8

ENV DEBIAN_FRONTEND=noninteractive

RUN export uid=1000 gid=1000 && \
    mkdir -p /home/developer && \
    echo "developer:x:${uid}:${gid}:Developer,,,:/home/developer:/bin/bash" >> /etc/passwd && \
    echo "developer:x:${uid}:" >> /etc/group && \
    chown ${uid}:${gid} -R /home/developer

ARG TIMEZONE
RUN ln -fs /usr/share/zoneinfo/"${TIMEZONE}" /etc/localtime
RUN dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update && apt-get install -y \
    git \
    curl

RUN pip install openai