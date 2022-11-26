from .serializers import QuizSerializer, CategorieSerializer, QuestionSerializer, FieldSerializer
from .serializers import WholeQuizSerializer,QuizAuthorSerializer, RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework import viewsets, mixins      
from .models import Quiz, Categorie, Question, Field, User
from rest_framework.permissions import AllowAny    
from rest_framework_simplejwt.views import TokenObtainPairView        

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
    queryset=Quiz.objects.all()

class QuizAuthorView(viewsets.GenericViewSet,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    serializer_class = QuizAuthorSerializer
    queryset=User.objects.all()
    lookup_field = 'id'

class RegisterView(viewsets.GenericViewSet,mixins.CreateModelMixin):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer