FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY src ./src
COPY public ./public

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
