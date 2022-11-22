from .serializers import QuizSerializer, CategorieSerializer, QuestionSerializer, FieldSerializer, WholeQuizSerializer, AnswerSerializer
from rest_framework import viewsets      
from .models import Quiz, Categorie, Question, Field, FurtherAnswer                 

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

class AnswerOptionView(viewsets.ModelViewSet):
    serializer_class=AnswerSerializer
    queryset=FurtherAnswer.objects.all()