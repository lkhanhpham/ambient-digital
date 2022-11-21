"""ambientDigital URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

from django.urls import include, path
from rest_framework import routers
from quiz import api_views  

router = routers.DefaultRouter()                   
router.register(r'quiz', api_views.QuizView, 'quiz') # localhost:8000/api/quiz/
router.register(r'categorie', api_views.CategorieView, 'categorie') # localhost:8000/api/categorie/
router.register(r'question', api_views.QuestionView, 'question') # localhost:8000/api/question/
router.register(r'field', api_views.FieldView, 'field')  # localhost:8000/api/field/
router.register(r'wholequiz', api_views.WholeQuizView, 'wholequiz')  # localhost:8000/api/wholequiz/

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/',  include(router.urls)),

]
