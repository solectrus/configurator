FROM nginx:stable-alpine

LABEL maintainer="georg@ledermann.dev"
LABEL org.opencontainers.image.description="SOLECTRUS Configurator"

# Copy built assets from 'dist' to the serve directory
COPY dist /usr/share/nginx/html

COPY _nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY _nginx/general-security-headers.conf /etc/nginx/snippets/general-security-headers.conf

EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
