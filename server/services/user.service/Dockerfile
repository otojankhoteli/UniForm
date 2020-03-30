FROM node:12.16-alpine as builder

WORKDIR /user.service

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

RUN yarn install

COPY src src
COPY index.ts .

RUN npx tsc

FROM node:12.16-alpine
WORKDIR /user.service

COPY --from=builder /user.service/build .
COPY yarn.lock .
COPY package.json .
RUN yarn install --production

CMD ["node", "./index.js"]