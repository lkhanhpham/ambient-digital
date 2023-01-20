# pull official base image
FROM python:3.11.0-alpine

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk del build-deps

# Use /src folder as a directory where the source code is stored.
RUN mkdir /usr/src/backend
WORKDIR /usr/src/backend
ADD Pipfile Pipfile.lock /usr/src/backend/

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -U pip pipenv
RUN pipenv install --system --deploy

# copy run_backend_e2e_test.sh
COPY ./run_backend_e2e_test.sh /usr/src/backend/run_backend_e2e_test.sh

# Copy the source code of the project into the container.
COPY . /usr/src/backend

RUN ["chmod", "+x", "/usr/src/backend/run_backend_e2e_test.sh"]
CMD ["./usr/src/backend/run_backend_e2e_test.sh"]

