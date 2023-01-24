FROM node:16-alpine
WORKDIR /front
COPY package.json /front/package.json
RUN npm install
EXPOSE 3000
COPY . /front/
CMD ["npm", "run", "dev"] 