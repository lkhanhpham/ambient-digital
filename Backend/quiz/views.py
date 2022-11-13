from django.shortcuts import render
from .serializers import QuizSerializer 
from rest_framework import viewsets      
from .models import Quiz                 

class QuizView(viewsets.ModelViewSet):  
    serializer_class = QuizSerializer   
    queryset = Quiz.objects.all()  