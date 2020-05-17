FROM node:10.15.3

RUN mkdir -p /src/proxy

WORKDIR /src/proxy

COPY ${pwd} /src/proxy

RUN npm install

EXPOSE 8000

CMD [ "node", "./server/index.js"]