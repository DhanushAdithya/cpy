FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

ENV $(cat .env | xargs)

RUN yarn install
# RUN npm i

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
# CMD ["npm", "run", "dev"]
