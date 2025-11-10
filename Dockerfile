FROM nginx:1.20-alpine

ARG HTML_DIR

COPY ${HTML_DIR} /usr/share/nginx/html
