# Dockerfile for Home API

# Start from Node 16
FROM node:16-alpine

# Set working directory
WORKDIR /workspace/api

# Copy application code over
COPY ./api .

# Copy shared code over
COPY ./shared ../shared

# Install dependencies
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]