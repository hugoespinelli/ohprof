FROM node:10

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080
EXPOSE 3000
EXPOSE 5000

CMD ["node", "./bin/www"]

