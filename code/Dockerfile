# Using Ubuntu as the base image
FROM ubuntu:22.04

# Avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install FFmpeg and other necessary dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy your project files
COPY ./frontend/ /app/frontend/
COPY ./static/ /app/static/

RUN ffmpeg -i ./static/backvideo-60.mp4 -vf scale=1920:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p ./frontend/backvideo.mp4
# Create a directory for the processed videos if it doesn't exist
RUN mkdir -p /app/static/videos


# Configure Nginx to serve your files
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /app/frontend; \
        try_files $uri $uri/ =404; \
    } \
    location /static/ { \
        alias /app/static/; \
    } \
}' > /etc/nginx/sites-available/default

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]