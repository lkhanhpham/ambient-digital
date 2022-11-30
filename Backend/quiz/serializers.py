from rest_framework import serializers
from .models import Quiz, Categorie, Question, Field, FurtherAnswer, DefaultAnswer 

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories','author')

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurtherAnswer
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    answer_option=AnswerSerializer(many=True, read_only=True)
    def_answer =serializers.CharField(source='default_answer.text')

    class Meta:
        model = Question
        fields = ('question_text','pub_date','author','multiplayer','question_type','def_answer','answer_option')

#This class will lead to merge-conflicts, when merging the feature/backend-Fragen-erweitern branch into a branch containing this class
#When this happens replace this classs with the FieldSerializer in the other branch, because the model has been updated
class FieldSerializer(serializers.ModelSerializer):
    categorie_name= serializers.ReadOnlyField(source='categorie.categorie_name')
    question_text= serializers.ReadOnlyField(source='question.question_text')

    class Meta:
        model = Field
        fields = ('point','question','question_text','categorie','categorie_name','quiz',)

    def create(self, validated_data: dict):    

        created_field = Field.objects.create(
                point=validated_data.get('point'),
                categorie=validated_data.get('categorie'),
                question=validated_data.get('question'),
                quiz=validated_data.get('quiz')
            )
        return created_field
    
    def update(self, instance, validated_data):
        instance.point = validated_data.get('point', instance.point)
        instance.categorie = validated_data.get('categorie', instance.categorie)
        instance.quiz = validated_data.get('quiz', instance.quiz)
        instance.question = validated_data.get('question',instance.question)

        instance.save()
        return instance

class WholeQuizSerializer(serializers.ModelSerializer):
    quiz_field=FieldSerializer(many=True, read_only=True)

    class Meta:
        model= Quiz
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories', 'quiz_field')