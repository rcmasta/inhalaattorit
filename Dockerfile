# Setup node backend
FROM node:20
WORKDIR /backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend /backend
COPY frontend /frontend

# Copy the entrypoint into the container
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose backend port
EXPOSE 3000

# Start server with entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]