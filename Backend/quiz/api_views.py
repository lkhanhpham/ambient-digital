from .serializers import QuizSerializer, CategorieSerializer, QuestionSerializer, FieldSerializer
from .serializers import WholeQuizSerializer,QuizAuthorSerializer
from rest_framework import viewsets, mixins      
from .models import Quiz, Categorie, Question, Field, User            

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