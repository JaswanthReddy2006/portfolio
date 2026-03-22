FROM node:20-alpine as build-frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=build-frontend /app/dist ./dist
EXPOSE 5000
CMD ["node", "server.js"]
