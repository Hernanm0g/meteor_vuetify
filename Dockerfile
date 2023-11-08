# Use the official Meteor image as a parent image
FROM geoffreybooth/meteor-base:2.2

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available) into the container
COPY ./package*.json ./

RUN meteor npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

RUN mv settings.example.json settings.json

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["meteor", "npm", "start"]