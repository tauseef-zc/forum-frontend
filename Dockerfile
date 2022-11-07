FROM node:16.15

WORKDIR /var/sites/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]