FROM node:14

WORKDIR /opt/technical-assignment-infrastructure/

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD [ "node", "./src/index.js" ]
