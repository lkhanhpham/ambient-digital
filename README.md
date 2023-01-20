# Ambient Digital

## Jeopardy Quiz

## Intro

This project was developed in cooperation with Ambient Digital as part of the Capstone Project at the University of Cologne.
Our Goal is to build our own verison of the famous jeopardy quiz for companies to strengthen their team culture. The whitelabel version is the next step. Currently it is not implemented to upload own color themes or logos, but it is ready to play.

## Getting started

If you want to checkout the current status of the **develop branch** you can check the [Links](#Links) section and open the [Test | Frontend](https://quizai-test.vercel.app/) and [Test | Backend](https://quizai-test.herokuapp.com/admin/login) to find the current commit of develop branch deployed on Vercel / Heroku.

Use the [Prod | Frontend](https://quizai.vercel.app/) and [Prod | Backend](https://quizai-prod.herokuapp.com/admin/login) Links to checkout the current commit on the main branch.

If you want to checkout any of the other branches please follow the setps below.

You will need **Python 3.11.0** or higher.
You can download the current Python version from [here](https://www.python.org/downloads/)

## Installations

We suggest you run the project in a docker container.
Get docker [here](https://docs.docker.com/).
You need to type the following command only once after the installation of docker.

```
$ git config --global core.autocrlf input
```

To start the Project type the following command in your terminal in the same folder, where you cloned the git project, but make sure that docker is up and running. For the initial start.

```
$ docker compose up --build
```

```
$ docker compose up
```

To get access to the Django Admin Interface, you must create a superuser in Docker. Just open your Docker-App and go in the terminal of your backend container. Type the following command:

```
$ pthon manage.py createsuperuser
```

Now you just need an username, password and an email. This are the credetials now to log in on localhost:8000/admin

### Without Docker

If you don't want to use the docker container, we could not guarantee that the project will run without any problems. And you will not have a database, where you can store your created questions and quiz.

If you still want to start the project without docker you have to follow the steps

To install all the needed packages please execute the follwing steps below.

```
$ git clone "path to GitLab Project"
$ cd ../path/to/the/folder/Frontend
$ npm install
$ cd ../path/to/the/folder/Backend
$ pip install django
$ pip install djangorestframework
$ pip install djangorestframework-simplejwt
$ pip install django-cors-headers
$ pip install cloudinary
$ pip install django-cloudinary-storage
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

## Current Status

Now you can see the current status of the frontend by visiting localhost:3000.

You can see the django backend admin panel by visiting localhost:8000/admin.

Our developed Apis are available under localhost:8000/api

It is possible to create questions and an whole quiz over the frontend, which is saved in the backend.
Moreover you can created questions individually and select them in the process of creating a quiz. It is also possible to navigate, through the navigation bar on the right, back to the "Home" site.
You can edit a quiz and questions after you created them to add information or fix some typos.

There are differnt questions types, the single choice, estimation and a multiple choice question. Each Question kan have a picture or a video to make the quiz game more interesting. There is an opportunity to only show the sound of a video, so the quiz master can limit the information to this sound. This can make a question harder.

After you created a quiz it is possible and necessary to add at least two teams. You can create user for this Teams or add existing Users.

After that the quiz is ready to play it.

## Playing

Now you created your first quiz. On the Library Site are now your questions and your new quiz. To play it, you have to click on the title. After that you will see a grid with points and your teams under this grid. First one team has to select a question and you click on this field. Second the team has to answer and after that you can show the solution to this question. Now you can go back to the quiz and a Modal will pop up, where you as a quiz master can decide if you want to assigne points for this question. If not you can close the Modal by clicking on the "assign no point" button.

After playing the quiz you click on "End quiz" and the winner team will be shown.

## Testing

We will test our project end to end with Playwright. So if you want to work with this project you will need playwright too. This will be installed automatically, when you followed the installation instructions.
We still have only a few dummy test which are running in a git pipeline.

## Git Pipeline

Our git pipeline builds, each time you push to develop or main, a docker container. The tests are executed in this container. After that the project gets published on Vercel and heroku.

## Development status

This Project is still in development.
We are currently working on qualtity of life changes and testing.

## Links

[Vercel](https://vercel.com/capstone-ambientdigital/quizai) - Frontend Deployment <br>
[Heroku](https://dashboard.heroku.com/teams/capstone-ambientdigital-2022/apps) - Backend Deployment

[Test | Frontend](https://quizai-test.vercel.app/) <br>
[Test | Backend](https://quizai-test.herokuapp.com/admin/login)

[Prod | Frontend](https://quizai.vercel.app/) <br>
[Prod | Backend](https://quizai-prod.herokuapp.com/admin/login)
