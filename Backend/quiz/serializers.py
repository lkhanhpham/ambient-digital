from rest_framework import serializers
from .models import Quiz, Categorie, Question, Field, FurtherAnswer, MyUser, DefaultAnswer, Team, TeamMember
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

class QuizTeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Team
        fields=('id','team_name','team_points')

class QuizSerializer(serializers.ModelSerializer):
    team_quiz=QuizTeamsSerializer(many=True,read_only=True)
    class Meta:
        model = Quiz
        fields = ('id','quiz_name' ,'pub_date', 'nr_of_rows', 'nr_of_categories','author','team_quiz',)

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
    def create(self, validated_data: dict):
        super.create(validated_data)


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
        fields = ('point','categorie','categorie_name','quiz','question_id','question')
    
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
        model = MyUser
        fields =  ('id','username','quiz_author')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        #custom claims
        token['username'] = user.username
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
            required=True,validators=[UniqueValidator(queryset=MyUser.objects.all())])

    class Meta:
        model = MyUser
        fields = ('username', 'password', 'password2','email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = MyUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'])
            
        user.set_password(validated_data['password'])
        user.save()

        return user

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('username','is_guest')
        read_only_fields=('is_guest',)

    def create(self, validated_data):
        user = MyUser.objects.create(
            username=validated_data['username'],
            is_guest=True
            )
            
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyUser
        fields=('id','username','is_guest','is_superuser','points','email')

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model=TeamMember
        fields=('id','team','member','quiz')
        read_only_fields=('team','quiz','id')

class TeamSerializer(serializers.ModelSerializer):
    teamMember_team= TeamMemberSerializer(many=True, required=False)

    class Meta:
        model=Team
        fields=('id','team_name','team_points','quiz','teamMember_team')

    def create(self, validated_data: dict):
        team_member_list = []
        if validated_data.get('teamMember_team'):
            team_member_list = validated_data.pop('teamMember_team')

        created_team = super().create(validated_data)

        for teammember in team_member_list:
            TeamMember.objects.create(
                quiz=created_team.quiz,
                member=teammember.get('member'),
                team=created_team
            )

        return created_team

    def update(self, instance, validated_data):

        TeamMember.objects.filter(team=instance.id).delete()

        instance.id = validated_data.get('id', instance.id)
        instance.quiz= validated_data.get('quiz',instance.quiz)
        instance.team_name = validated_data.get('team_name', instance.team_name)
        instance.team_points = validated_data.get('team_points', instance.team_points)

        team_member_list = []
        if validated_data.get('teamMember_team'):
            team_member_list = validated_data.pop('teamMember_team')

        for teammember in team_member_list:
            TeamMember.objects.create(
                quiz=instance.quiz,
                member=teammember.get('member'),
                team=instance
            )

        instance.save()
        return instance

class TeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model=TeamMember
        fields=('id','team','member','quiz')
        read_only_fields=('team','quiz','id')

class AddTeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model=TeamMember
        fields=('id','team','member','quiz')
        read_only_fields=('id','quiz')

    def create(self, validated_data: dict):
        team_instance = validated_data.get('team')

        created_member = TeamMember.objects.create(
                team=team_instance,
                member=validated_data.get('member'),
                quiz=team_instance.quiz,
            )
        return created_member