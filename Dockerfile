FROM node:20-alpine AS js-build

RUN npm i -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY build.js .
COPY src/ ./src/

RUN pnpm run build

###

FROM ruby:3-alpine

RUN gem update --system \
 && gem install bundler

WORKDIR /app

COPY --from=js-build /app/public/ ./public/

COPY Gemfile Gemfile.lock ./

RUN apk add --no-cache make g++

RUN bundle config set --local deployment 'true' \
 && bundle install

COPY app.rb config.ru ./
COPY views/ ./views/

EXPOSE 3001

CMD ["bundle", "exec", "rackup", "-p", "3001", "-o", "0.0.0.0"]
