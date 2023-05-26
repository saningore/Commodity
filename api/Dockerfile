FROM node:alpine

WORKDIR /usr/app

COPY package.json package-lock.json .

RUN npm ci

COPY . .

CMD ["npm", "start"]