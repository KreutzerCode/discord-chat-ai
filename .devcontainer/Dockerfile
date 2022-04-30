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
    curl \
    chromium

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get update && apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
     echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
     apt-get update && apt-get install --no-install-recommends -y yarn
     
RUN pip install openai translators