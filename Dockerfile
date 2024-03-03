FROM nginx:stable-alpine

LABEL maintainer="georg@ledermann.dev"
LABEL org.opencontainers.image.description="SOLECTRUS Configurator"

# Copy built assets from 'dist' to the serve directory
COPY dist /usr/share/nginx/html

# Optional: Copy your custom nginx.conf if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
