FROM node:19.5.0

WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn 
COPY . .
RUN yarn run build

EXPOSE 3000
CMD yarn start:prod