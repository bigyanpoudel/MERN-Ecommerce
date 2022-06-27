FROM node:16-alpine3.16

WORKDIR /user/src/app

COPY package*.json .

RUN  npm ci

COPY . .

CMD ["npm", "run", "server"]
