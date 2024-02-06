# Use the official Node.js image as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Copy tsconfig.json
COPY tsconfig.json ./

# Install all dependencies
RUN npm install

# Copy the TypeScript source files
COPY src ./src

# Compile the TypeScript code into JavaScript
RUN npm run build

# Use another Node.js image for the runtime stage
FROM node:14 as runtime

# Set the working directory in the container
WORKDIR /app

# Copy the necessary files from the build stage
COPY --from=build /app/dist .
COPY package*.json ./

# Install only the production dependencies
RUN npm install --only=production

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 3001
EXPOSE 3001

# Start the app using the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]