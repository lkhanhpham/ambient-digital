from rest_framework import serializers
from .models import Quiz, Categorie, Question, Field      

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories')

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ('categorie_name')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('question_text','answer_text' ,'pub_date')

class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = ('quiz' ,'point', 'question', 'categorie')