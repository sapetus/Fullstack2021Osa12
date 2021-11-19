FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only-production

ENV DEBUG=/mnt/c/Users/Sampo/Desktop/HY\ FullStack\ 2021/Palautettavat\ tehtävät/Fullstack2021OSa12/todo-app/todo-backend:*

CMD npm start
