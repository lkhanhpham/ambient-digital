# Ambient Digital
## Jeopardy Quiz

## Intro

This project was developed in cooperation with Ambient Digital as part of the Capstone Project at the University of Cologne.

## Getting started
You will need __Python 3.11.0__ or higher

## Installations
To install all the needed packages please execute the following commands
```
$ git clone 
$ cd ../path/to/the/folder/Frontend
$ npm install 
$ cd ../path/to/the/folder/Backend
$ pip install django
$ pip install djangorestframework
$ pip install flake8
$ pip install django-cors-headers
```

## Docker, Pipline and Co.
After the merge of the feature branch __3-Infra-Docker-Pipelines__, the packages no longer need to be installed manually, but you will need docker up and running.
Get docker [here](https://docs.docker.com/).
```
$ docker compose up
```
Till now we did not write test, so there are is no test stage in the __3-Infra-Docker-Pipelines__ branch.

## Get Started
Till now you need to start the frontend and backend each.
For the Frontend navigate to the Frontend folder and type 
``` 
$ npm start 
```
For the Backend navigate to the backend folder and type:
```
$ python backend/manage.py runserver
```
Now you can see the current status of the project on localhost:3000.

You can login into the django backend admin panel on localhost:8000/admin, where you can create a new quiz.

## Testing
We will test our project end to end with Playwright. So if you want to work with this project you will need playwright too. This will be installed automatically, when you followed the installation instructions.

## Project status
We are currently developing this project. 