FROM node:20-slim
WORKDIR /app
COPY backend/package.json /app
RUN npm install
COPY backend /app

CMD ["node", "main.js"]