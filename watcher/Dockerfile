# Dockerfile for Home Job Watcher

# Start from Node 16
FROM node:16-alpine

# Set working directory
WORKDIR /workspace/watcher

# Copy application code over
COPY ./watcher .

# Copy shared code over
COPY ./shared ../shared

# Install dependencies
RUN npm install

CMD [ "npm", "start" ]