FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD . /usr/src/app/

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]