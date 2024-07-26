FROM  node:latest

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

EXPOSE 3000

# install pm2 
RUN npm install pm2 
RUN npm install -g nodemon
RUN pm2 install pm2-logrotate


CMD ["pm2-runtime", "start", "ecosystem.config.js"]

