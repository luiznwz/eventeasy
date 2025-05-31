FROM node:22-alpine

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

# Adicionar wait-for-it
RUN apk add --no-cache bash
RUN wget -qO- https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh > /usr/local/bin/wait-for-it.sh && chmod +x /usr/local/bin/wait-for-it.sh

EXPOSE 9000

CMD ["wait-for-it.sh", "database:5432", "--", "npm", "run", "start:prod"]
