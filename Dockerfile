FROM node:20

WORKDIR /app

COPY . /app

# Perform clean install
RUN node index.js

CMD ["node", "index.js"]
