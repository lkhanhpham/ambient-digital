from .serializers import QuizSerializer, CategorieSerializer, QuestionSerializer, FieldSerializer, UserSerializer, TeamSerializer, TeammateSerializer
from .serializers import WholeQuizSerializer,QuizAuthorSerializer, RegisterSerializer, MyTokenObtainPairSerializer, GuestSerializer, AddTeammateSerializer
from .serializers import QuestionAuthorSerializer, CategorieAuthorSerializer
from rest_framework import viewsets, mixins      
from .models import Quiz, Categorie, Question, Field, MyUser, Team, TeamMember
from rest_framework.permissions import AllowAny    
from rest_framework_simplejwt.views import TokenObtainPairView 
from django.db.models import Prefetch       

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

class WholeQuizView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    serializer_class=WholeQuizSerializer
    queryset=Quiz.objects.prefetch_related(Prefetch('field_quiz',
        queryset=Field.objects.order_by('point')))

class QuizAuthorView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    serializer_class = QuizAuthorSerializer
    queryset=MyUser.objects.all()
    lookup_field = 'id'

class QuestionAuthorView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    serializer_class = QuestionAuthorSerializer
    queryset=MyUser.objects.all()
    lookup_field = 'id'

class CategorieAuthorView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    serializer_class = CategorieAuthorSerializer
    queryset=MyUser.objects.all()
    lookup_field = 'id'

class RegisterView(viewsets.GenericViewSet,mixins.CreateModelMixin):
    serializer_class = RegisterSerializer
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterGuestView(viewsets.GenericViewSet,mixins.CreateModelMixin):
    serializer_class = GuestSerializer
    queryset = MyUser.objects.all()
    permission_classes = (AllowAny,)

class UserObtainView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    serializer_class=UserSerializer
    queryset=MyUser.objects.all()
    permission_classes = (AllowAny,)

class TeamView(viewsets.ModelViewSet):
    serializer_class=TeamSerializer
    queryset=Team.objects.all()

class TeammateView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
    serializer_class= TeammateSerializer
    queryset=TeamMember.objects.all()

class AddTeammateView(viewsets.GenericViewSet,mixins.CreateModelMixin,mixins.DestroyModelMixin):
    serializer_class = AddTeammateSerializer
    queryset = TeamMember.objects.all()