FROM node:18.14.2-alpine3.17

COPY . /opt/hey-dev

WORKDIR /opt/hey-dev
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]