from rest_framework import serializers
from .models import Quiz, Categorie, Question, Field, FurtherAnswer, User, DefaultAnswer

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
        fields = ('text', 'is_correct')

class DefaultAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model=DefaultAnswer
        fields='__all__'

class QuestionSerializer(serializers.ModelSerializer):
    question_answer_option=AnswerSerializer(many=True, required=False)
    default_answer =DefaultAnswerSerializer()

    class Meta:
        model = Question
        fields = ('id','question_text','pub_date','author','multiplayer','question_type','default_answer','question_answer_option')

    def create(self, validated_data: dict):
        default_answer = validated_data.pop('default_answer')

        answer_option_list = []
        if validated_data.get('question_answer_option'):
            answer_option_list = validated_data.pop('question_answer_option')

        default_answer_instance = DefaultAnswer.objects.create(
            text=default_answer.get('text'), is_correct=default_answer.get('is_correct', True)
        )

        validated_data['default_answer'] = default_answer_instance

        created_question = super().create(validated_data)

        for answer_option in answer_option_list:
            FurtherAnswer.objects.create(
                text=answer_option.get('text'),
                is_correct=answer_option.get('is_correct', False),
                question_id=created_question.id
            )

        return created_question
    def update(self, instance, validated_data):

        if validated_data.get('question_answer_option'):
            FurtherAnswer.objects.filter(question_id=instance.id).delete()

        instance.id = validated_data.get('id', instance.id)
        instance.question_text = validated_data.get('question_text', instance.question_text)
        instance.author = validated_data.get('author', instance.author)
        instance.multiplayer = validated_data.get('multiplayer', instance.multiplayer)
        instance.question_type = validated_data.get('question_type', instance.question_type)

        default_answer = validated_data.pop('default_answer')
        default_answer_orig =instance.default_answer 
        default_answer_instance=DefaultAnswer.objects.get(
            id=default_answer_orig.id
        )
        default_answer_instance.text=default_answer.get('text')
        default_answer_instance.save()
        instance.default_answer=default_answer_instance

        answer_option_list = []
        if validated_data.get('question_answer_option'):
            answer_option_list = validated_data.pop('question_answer_option')

        for answer_option in answer_option_list:
            FurtherAnswer.objects.create(
                text=answer_option.get('text'),
                is_correct=answer_option.get('is_correct', False),
                question_id=instance.id
            )
        instance.save()
        return instance

#This class will lead to merge-conflicts, when merging the feature/backend-Fragen-erweitern branch into a branch containing this class
#When this happens replace this classs with the FieldSerializer in the other branch, because the model has been updated
class FieldSerializer(serializers.ModelSerializer):
    categorie_name= serializers.ReadOnlyField(source='categorie.categorie_name')
    question_id=serializers.IntegerField(source='question.id')
    question= QuestionSerializer(read_only=True)

    class Meta:
        model = Field
        fields = ('id','point','categorie','categorie_name','quiz','question_id','question')
    
    def create(self, validated_data: dict):
        question_instance = validated_data.get('question')
        question_instance = Question.objects.get(id=question_instance.get('id'))

        created_field = Field.objects.create(
                point=validated_data.get('point'),
                categorie=validated_data.get('categorie'),
                question=question_instance,
                quiz=validated_data.get('quiz')
            )
        return created_field
    def update(self, instance, validated_data):
        instance.point = validated_data.get('point', instance.point)
        instance.categorie = validated_data.get('categorie', instance.categorie)
        instance.quiz = validated_data.get('quiz', instance.quiz)

        question_instance=validated_data.get('question')
        question_instance = Question.objects.get(id=question_instance.get('id'))
        instance.question=question_instance

        instance.save()
        return instance

class WholeQuizSerializer(serializers.ModelSerializer):
    field_quiz=FieldSerializer(many=True, read_only=True)

    class Meta:
        model= Quiz
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories', 'field_quiz')

class AuthorAssociatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz    
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories','author') 

class QuizAuthorSerializer(serializers.ModelSerializer):
    quiz_author=AuthorAssociatedSerializer(read_only=True, many=True)
    class Meta:
        model = User
        fields =  ('id','username','quiz_author')