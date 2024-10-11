FROM node:alpine
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./server ./src
COPY ./.env ./
COPY ./config.js ./
CMD ["npm", "start"]