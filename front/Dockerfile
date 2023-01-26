FROM node:alpine
WORKDIR /front
COPY package.json /front/
RUN npm install
EXPOSE 3000
COPY . /front/
CMD ["npm", "run", "dev"] 