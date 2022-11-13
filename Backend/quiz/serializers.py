from rest_framework import serializers
from .models import Quiz

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories')