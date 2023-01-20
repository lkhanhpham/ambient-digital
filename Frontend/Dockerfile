# base image
FROM node:19.0

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json package-lock.json /app/
COPY .npm /app/
RUN npm install

# Copy all frontend stuff to new "app" folder
COPY . /app/

EXPOSE 3000

CMD ["npm", "run", "start"]
