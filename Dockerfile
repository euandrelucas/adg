FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN bun install

# Bundle app source
COPY . .
RUN bun prod:build

# Expose the port
EXPOSE 5467

# Start the app
CMD [ "npx", "bun", "prod:start" ]