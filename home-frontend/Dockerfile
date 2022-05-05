# Dockerfile for SBOL Home frontend

# Start from Node 16
FROM node:16-alpine

WORKDIR /app

# Copy application code over
COPY ./home-frontend .

# Copy shared code over
# COPY ./shared .

# Install dependencies
RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev", "--", "--host" ]