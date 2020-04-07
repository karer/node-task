FROM node:12-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm ci --silent
RUN npm audit fix

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
