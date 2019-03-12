FROM node:7
EXPOSE 80
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install --silent
CMD ["npm", "start"]