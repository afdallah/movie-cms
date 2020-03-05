FROM node:12.13-alpine
ARG env
WORKDIR app
COPY . .
RUN npm install
RUN NODE_ENV=$env npm run build

CMD npm start
