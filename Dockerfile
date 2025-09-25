# Use the official Node.js image as a base image
FROM node:20-alpine

# Set working directory to Frontend folder in container
WORKDIR /app/Frontend

# Copy only Frontend package files first for install caching
COPY Frontend/package*.json ./

# Install frontend dependencies including @vitejs/plugin-react
RUN npm install

# Copy rest of the frontend app code
COPY Frontend/ .

# Run vite build from frontend folder
RUN npm run build

# Expose the port your app listens on (adjust if needed)
EXPOSE 3000

# Command to start the app (adjust if you have a start script)
CMD ["npm", "start"]
