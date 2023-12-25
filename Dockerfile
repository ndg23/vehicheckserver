FROM node:16-alpine as build

#Accepting build-arg to create environment specific build
#it is useful when we have multiple environment (e.g: dev, tst, staging, prod)
#default value is development
ARG build_env=production

#Creating virtual directory inside docker image
WORKDIR /app

RUN npm cache clean --force

#Copying file from local machine to virtual docker image directory
COPY . .

#installing deps for project
RUN npm install --legacy-peer-deps

#creating angular build
RUN npm run build

#exposing internal port
EXPOSE 3000
CMD ["npm", "run", "start:dev"]