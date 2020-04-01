FROM node

RUN install -m 775 -d /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install --silent


CMD [ "npm", "start" ]