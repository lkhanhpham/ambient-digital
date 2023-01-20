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
from quiz.api_views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from django.conf.urls.static import static
from django.conf import settings

# The following registers api_views to a url
# they can be accessed on http://localhost:8000/api/<apiName>
# e.g. http://localhost:8000/api/quiz
router = routers.DefaultRouter()
router.register(r"quiz", api_views.QuizView, "quiz")
router.register(r"categorie", api_views.CategorieView, "categorie")
router.register(r"question", api_views.QuestionView, "question")
router.register(r"field", api_views.FieldView, "field")
router.register(r"wholequiz", api_views.WholeQuizView, "wholequiz")
router.register(r"authorquiz", api_views.QuizAuthorView, "authorquiz")
router.register(r"registration", api_views.RegisterView, "registration")
router.register(r"guestregistration", api_views.RegisterGuestView, "guestregistration")
router.register(r"user", api_views.UserObtainView, "user")
router.register(r"Teams", api_views.TeamView, "Teams")
router.register(r"Teammates", api_views.TeammateView, "Teammates")
router.register(r"AddTeammates", api_views.AddTeammateView, "AddTeammates")
router.register(r"authorquestion", api_views.QuestionAuthorView, "authorquestion")
router.register(r"authorcategorie", api_views.CategorieAuthorView, "authorcategorie")
router.register(r"images", api_views.ImageView, "images")
router.register(r"imageauthor", api_views.ImageAuthorView, "imageauthor")
router.register(r"video", api_views.VideoView, "video")
router.register(r"videoauthor", api_views.VideoAuthorView, "videoauthor")
router.register(r"TeamPoints", api_views.TeamPointView, "TeamPoints")
router.register(r"UserPoints", api_views.UserPointView, "UserPoints")
router.register(r"leaderboard", api_views.LeaderboardView, "leaderboard")

urlpatterns = [
    # manualy registers some views to urls. they can be reached at http://localhost:8000/<path>
    # These urls will not show up on http://localhost:8000/api
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# configures the interface for images by taking the root and url from the settings file
