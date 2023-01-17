from .serializers import (
    QuizSerializer,
    CategorieSerializer,
    QuestionSerializer,
    FieldSerializer,
    UserSerializer,
    TeamSerializer,
    TeammateSerializer,
    WholeQuizSerializer,
    QuizAuthorSerializer,
    RegisterSerializer,
    MyTokenObtainPairSerializer,
    GuestSerializer,
    AddTeammateSerializer,
    ImageSerializer,
    ImageAuthorSerializer,
    VideoSerializer,
    VideoAuthorSerializer,
    AddPointSerializer,
    AddUserPointSerializer,
    LeaderboardSerializer,
)
from .serializers import QuestionAuthorSerializer, CategorieAuthorSerializer
from rest_framework import viewsets, mixins
from .models import (
    Quiz,
    Categorie,
    Question,
    Field,
    MyUser,
    Team,
    TeamMember,
    Image,
    Video,
)
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Prefetch
from rest_framework.parsers import MultiPartParser, FormParser


# The classes in api_views are connected to a url in urls.py and connect a serializer with a
# queryset to indicate where in the database data will be accessed
# All classes inheriting from ModelViewSet can handle all basic requests (get,post,delete,put)
# Classes inheriting from mixins can only handle these specific requests
class QuizView(viewsets.ModelViewSet):
    serializer_class = QuizSerializer
    queryset = Quiz.objects.all()


class CategorieView(viewsets.ModelViewSet):
    serializer_class = CategorieSerializer
    queryset = Categorie.objects.all()


class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class FieldView(viewsets.ModelViewSet):
    serializer_class = FieldSerializer
    queryset = Field.objects.all()


class WholeQuizView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = WholeQuizSerializer
    # The get request will return all questions ordered by points acending
    queryset = Quiz.objects.prefetch_related(
        Prefetch("field_quiz", queryset=Field.objects.order_by("point"))
    )


class QuizAuthorView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = QuizAuthorSerializer
    queryset = MyUser.objects.prefetch_related(
        Prefetch("quiz_author", queryset=Quiz.objects.order_by("-last_edit"))
    )
    lookup_field = "id"


class QuestionAuthorView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = QuestionAuthorSerializer
    queryset = MyUser.objects.prefetch_related(
        Prefetch("question_author", queryset=Question.objects.order_by("-last_edit"))
    )
    lookup_field = "id"


class CategorieAuthorView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = CategorieAuthorSerializer
    queryset = MyUser.objects.prefetch_related(
        Prefetch(
            "categorie_author", queryset=Categorie.objects.order_by("categorie_name")
        )
    )
    lookup_field = "id"


class RegisterView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = RegisterSerializer
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterGuestView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = GuestSerializer
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)


class UserObtainView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = UserSerializer
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)


class TeamView(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    # The get request will return all teams ordered by name in alphabetical order
    queryset = Team.objects.order_by("team_name")


class TeammateView(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    serializer_class = TeammateSerializer
    queryset = TeamMember.objects.all()


class AddTeammateView(
    viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin
):
    serializer_class = AddTeammateSerializer
    queryset = TeamMember.objects.all()


class AddTeamPointView(
    viewsets.ModelViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin
):
    serializer_class = AddPointSerializer
    queryset = Team.objects.all()


class AddUserPointView(
    viewsets.ModelViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin
):
    serializer_class = AddUserPointSerializer
    queryset = MyUser.objects.all()


class VideoView(viewsets.ModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()


class ImageView(viewsets.ModelViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    # required for form-data posts


class ImageAuthorView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = ImageAuthorSerializer
    queryset = MyUser.objects.all()
    lookup_field = "id"


class VideoAuthorView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = VideoAuthorSerializer
    queryset = MyUser.objects.all()
    lookup_field = "id"


# returns all users ordered by points descending
class LeaderboardView(
    viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin
):
    serializer_class = LeaderboardSerializer
    queryset = MyUser.objects.all()
    queryset = MyUser.objects.order_by("-points")
