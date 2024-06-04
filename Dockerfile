FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install bun
RUN apt update && apt install -y curl
RUN curl -fsSL https://bun.sh/install | bash

# Disable IPv6
RUN sysctl -w net.ipv6.conf.all.disable_ipv6=1
RUN sysctl -w net.ipv6.conf.default.disable_ipv6=1

# Add bun to PATH
ENV BUN_INSTALL=/root/.bun
ENV PATH=$BUN_INSTALL/bin:$PATH

# Install app dependencies
COPY package*.json ./
RUN bun upgrade
RUN bun install

# Bundle app source
COPY . .
RUN bun prod:build

# Expose the port
EXPOSE 5467

# Start the app
CMD ["bun", "prod:start"]
