# Setup node backend
FROM node:20

WORKDIR /backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend /backend
COPY frontend /frontend

# Expose backend port
EXPOSE 3000

CMD ["node", "server.js"]