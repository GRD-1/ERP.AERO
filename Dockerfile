# Base image for Node
FROM node:18.16.0 as nodeapp

# Copy project files
WORKDIR /projectFiles
COPY ./server/package.json ./

# Install dependencies and build the project
RUN npm install

# Expose necessary ports
EXPOSE 3000

# Define the startup command
ENTRYPOINT ["npm", "run", "start"]
