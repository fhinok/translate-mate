FROM node:20-slim
WORKDIR /app
COPY backend/package.json /app
COPY frontent/dist /app/public
RUN npm install
COPY backend /app

CMD ["node", "main.js"]