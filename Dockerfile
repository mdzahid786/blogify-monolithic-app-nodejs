# Use an official Node.js LTS image
FROM node:22.1.0-alpine

# Set working directory inside the container
WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
#RUN npm install --production
RUN npm install

# Now copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "app.js"]
