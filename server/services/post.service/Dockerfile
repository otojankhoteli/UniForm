FROM node:12-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install

COPY src src
COPY index.ts .

RUN npx tsc

FROM node:12-alpine
WORKDIR /app

COPY --from=builder /app/build .
COPY yarn.lock .
COPY package.json .
RUN yarn install --production

CMD ["node", "--inspect=0.0.0.0:9230", "./index.js"]