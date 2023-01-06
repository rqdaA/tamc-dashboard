FROM node as builder
WORKDIR /tmp/react
COPY react/ .
RUN yarn && yarn build

FROM nginx
WORKDIR /var/web/tamc_dashboard/
RUN rm -rf /etc/nginx/conf.d
COPY /docker/nginx/ /etc/nginx/
COPY --from=builder /tmp/react/build/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]