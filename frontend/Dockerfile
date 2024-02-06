# Stage 1 - the build process
FROM node:14 as build-deps

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . ./

# Compile TypeScript into JavaScript and build the app
RUN npm run build

# Stage 2 - the production environment
FROM node:14

# Install serve
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build output from stage 1
COPY --from=build-deps /usr/src/app/build .

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Start the app using the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]