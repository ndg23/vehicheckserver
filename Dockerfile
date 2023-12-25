# Build stage
FROM node:18.16.0-alpine3.17 AS build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build

# Production stage
FROM node:18.16.0-alpine3.17
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN yarn install
EXPOSE 3000
# CMD ["npm", "run", "start:dev"]
