FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV DB_HOST=db
ENV REDIS_HOST=redis

CMD ["node", "build/index.js"]
