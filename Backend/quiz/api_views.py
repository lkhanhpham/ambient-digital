from .serializers import QuizSerializer, CategorieSerializer, QuestionSerializer, FieldSerializer
from .serializers import WholeQuizSerializer, AnswerSerializer,QuizAuthorSerializer, DefaultAnswerSerializer
from rest_framework import viewsets      
from .models import Quiz, Categorie, Question, Field, FurtherAnswer, User , DefaultAnswer             

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

class WholeQuizView(viewsets.ModelViewSet):
    serializer_class=WholeQuizSerializer
    queryset=Quiz.objects.all()

class QuizAuthorView(viewsets.ModelViewSet):
    serializer_class = QuizAuthorSerializer
    queryset=User.objects.all()
    lookup_field = 'id'