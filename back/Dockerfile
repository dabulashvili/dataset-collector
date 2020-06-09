FROM node:alpine

WORKDIR /app
RUN apk --no-cache add ffmpeg
COPY package*.json ./
RUN npm install --only=prod
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]