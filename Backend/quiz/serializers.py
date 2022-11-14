from rest_framework import serializers
from .models import Quiz, Categorie, Question, Field      

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories')

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('question_text','answer_text' ,'pub_date')

class FieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = Field
        fields = '__all__'

class WholeQuizSerializer(serializers.ModelSerializer):
    quiz_field=FieldSerializer(many=True, read_only=True)

    class Meta:
        model= Quiz
        fields = '__all__'