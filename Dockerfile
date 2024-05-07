# BUILD
FROM node:latest as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# DEPLOY
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html