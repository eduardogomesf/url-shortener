FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build
RUN rm -rf node_modules

FROM node:20-alpine AS runner

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app ./

RUN yarn install --production

USER appuser

EXPOSE 3000

CMD ["yarn", "run", "prod"]