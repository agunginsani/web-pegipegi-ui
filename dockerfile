FROM node:16-alpine as build

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build-storybook

FROM nginx:alpine

ENV PORT=80

COPY --from=build /src/storybook-static /usr/share/nginx/html
COPY --from=build /src/nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'