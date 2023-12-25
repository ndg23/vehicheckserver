# Stage 1: Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install app dependencies
RUN yarn install

COPY . .

# Build the application
RUN yarn build

# Stage 2: Create a production image
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./

# Install only production dependencies using yarn
RUN apk --no-cache add yarn \
    && yarn install --production

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm run start:dev"]
