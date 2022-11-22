from rest_framework import serializers
from .models import Quiz, Categorie, Question, Field      

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories','author')

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('question_text','pub_date','author')

class FieldSerializer(serializers.ModelSerializer):
    categorie_name= serializers.ReadOnlyField(source='categorie.categorie_name')
    question_text= serializers.ReadOnlyField(source='question.question_text')

    class Meta:
        model = Field
        fields = ('point','question','question_text','categorie','categorie_name','quiz',)

class WholeQuizSerializer(serializers.ModelSerializer):
    quiz_field=FieldSerializer(many=True, read_only=True)

    class Meta:
        model= Quiz
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories', 'quiz_field')