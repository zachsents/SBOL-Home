# Dockerfile for SBOL Home frontend

# Start from Node 16
FROM node:16-alpine

# Set working directory
WORKDIR /workspace/home-frontend

# Copy application code over
COPY ./home-frontend .

# Copy shared code over
COPY ./shared ../shared

# Install dependencies
RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev", "--", "--host" ]