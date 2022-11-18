# Ambient Digital
## Jeopardy Quiz

## Intro
This project was developed in cooperation with Ambient Digital as part of the Capstone Project at the University of Cologne.

## Getting started
You will need __Python 3.11.0__ or higher.
You can download the current Python version from [here](https://www.python.org/downloads/)

## Installations
We suggest you run the following commands in a python virtual environment.
Use the following command to create a [Virtual Environment](https://docs.python.org/3/library/venv.html) using Python and activate the Virtual Environment:
```
$ python3 -m venv /path/to/new/virtual/environment
$ cd /path/to/new/virtual/environment
$ ./Scripts/activate
```

To install all the needed packages please execute the following commands
```
$ git clone "path to GitLab Project"
$ cd ../path/to/the/folder/Frontend
$ npm install 
$ cd ../path/to/the/folder/Backend
$ pip install django
$ pip install djangorestframework
$ pip install flake8
$ pip install django-cors-headers
```

## Get Started
As of now you need to start the frontend and backend seperatley.
For the Frontend navigate to the Frontend folder and type 
``` 
$ npm start 
```
In a seperate terminal navigate to the Backend folder to start the Backend with the following command:
```
$ python ./manage.py runserver
```
Now you can see the current status of the project by visiting localhost:3000.

You can login into the django backend admin panel by visiting localhost:8000/admin

## Upcoming changes
## Docker, Pipline and Co.
After the merge of the feature branch __3-Infra-Docker-Pipelines__, the packages will no longer need to be installed manually, instead you will have to have docker up and running.
Get docker [here](https://docs.docker.com/).
```
$ docker compose up
```
There are no tests written as of now, so there is no test stage yet in the __3-Infra-Docker-Pipelines__ branch.


Till now we did not write test, so there is no test stage in the __3-Infra-Docker-Pipelines__ branch as of now.

## Testing
We will test our project end to end with Playwright. So if you want to work with this project you will need playwright too. This will be installed automatically, when you followed the installation instructions.

## Project status
This Project is still in development.
We are currently working on branch [feature/quiz-erstellen](https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-03/ambient-digital/-/tree/feature/3-infra-docker-pipelines)
Checkout this branch and follow the setup instructions there.