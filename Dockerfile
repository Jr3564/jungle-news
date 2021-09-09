FROM node:12
WORKDIR /usr/src/jungle-news
COPY ./package.json .
RUN npm install
