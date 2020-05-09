FROM node:12.16-alpine as builder

WORKDIR /blob.service

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install

COPY src src
COPY index.ts .

RUN npx tsc

FROM node:12.16-alpine
WORKDIR /blob.service

COPY --from=builder /blob.service/build .
COPY yarn.lock .
COPY package.json .
RUN yarn install --production

CMD ["node", "--inspect=0.0.0.0:9231", "./index.js"]