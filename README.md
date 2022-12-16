# Ambient Digital

## Jeopardy Quiz

## Intro
This project was developed in cooperation with Ambient Digital as part of the Capstone Project at the University of Cologne.
Our Goal is to build our own verison of the famous jeopardy quiz for companies to strengthen their team culture.

## Getting started
If you want to checkout the current status of the **develop branch** you can check the [Links](#Links) section and open the [Test | Frontend](https://quizai-test.vercel.app/) and [Test | Backend](https://quizai-test.herokuapp.com/admin/login) to find the current commit of develop branch deployed on Vercel / Heroku.

Use the [Prod | Frontend](https://quizai.vercel.app/) and [Prod | Backend](https://quizai-prod.herokuapp.com/admin/login) Links to checkout the current commit on the main branch.

If you want to checkout any of the other branches please follow the setps below.

You will need __Python 3.11.0__ or higher.
You can download the current Python version from [here](https://www.python.org/downloads/)

## Installations
We suggest you run the project in a docker container.
Get docker [here](https://docs.docker.com/).
You need to type the following command only once after the installation of docker.
```
$ git config --global core.autocrlf input
```

To start the Project type the following command in your terminal in the same folder, where you cloned the git project, but make sure that docker is up and running.
```
$ docker compose up
```

### Without Docker
If you don't want to use the docker container, we could not guarantee that the project will run without any problems.

If you still want to start the project without docker you have to follow the steps

To install all the needed packages please execute the follwing steps below.
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
If you use docker, this chapter can be skipped.

You need to start the frontend and backend seperatley.
For the frontend navigate to the frontend folder and type 
``` 
$ npm start 
```
In a seperate terminal navigate to the Backend folder to start the backend with the following command:
```
$ python ./manage.py runserver
```

## Current User Status
Now you can see the current status of the frontend by visiting localhost:3000.

You can see the django backend admin panel by visiting localhost:8000/admin. 

It is possible to create questions and an whole quiz over the frontend, which is saved in the backend. 
Moreover you can created questions individually and select them in the process of creating a quiz. It is also possible to navigate, through the navigation bar on the right, back to the "Home" site. The other options of the navigation bar are not used at the moment.
The edit button of the questions is not used at the moment.

## Upcoming changes
The next major changes are to include a possibility to build teams which can play the quiz against each other. It will also be possible to assign points to these teams. Furthermore you will be able to upload Pictures or add YouTube Videos to your questions.

## Testing
We will test our project end to end with Playwright. So if you want to work with this project you will need playwright too. This will be installed automatically, when you followed the installation instructions.

## Development status
This Project is still in development.
We are currently working on branch different branches for different features. Please checkout the following branches to see our progress on these features: <br>
- [feature/teams](https://gitlab.com/ciis-capstone-project/winter-2022-2023/team-03/ambient-digital/-/tree/feature/teams) for our progress on adding teams to a quiz.<br>

## Links

[Vercel](https://vercel.com/capstone-ambientdigital/quizai) - Frontend Deployment <br>
[Heroku](https://dashboard.heroku.com/teams/capstone-ambientdigital-2022/apps) - Backend Deployment

[Test | Frontend](https://quizai-test.vercel.app/) <br>
[Test | Backend](https://quizai-test.herokuapp.com/admin/login)

[Prod | Frontend](https://quizai.vercel.app/) <br>
[Prod | Backend](https://quizai-prod.herokuapp.com/admin/login)
