# base image
FROM node:19.0

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json package-lock.json /app/
RUN npm install

# Copy all frontend stuff to new "app" folder
COPY ./src /app/

RUN chown -R node:node /app/node_modules

EXPOSE 3000

