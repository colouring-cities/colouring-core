FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install -y build-essential wget
RUN apt-get install -y python3 python3-pip python3-dev python3-venv
RUN apt-get install parallel -y

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN mkdir /colouring-london
COPY app /colouring-london/app
COPY migrations /colouring-london/migrations
COPY etl /colouring-london/etl

ENV NODE_VERSION=16.13.2
RUN apt-get install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install -g npm@latest

WORKDIR ./colouring-london/app
RUN rm -rf node_modules
RUN npm install

EXPOSE 8080
CMD /wait && npm start