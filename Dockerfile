# From .nvmrc
FROM node:18.20.2

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Set the command to start the server
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
