FROM node:12-alpine as builder
WORKDIR /usr/src/adorazel.online
COPY . .
RUN npm install
RUN npm run client:install
RUN npm run client:build
EXPOSE 5000
CMD ["npm", "start"]