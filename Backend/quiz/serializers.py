from rest_framework import serializers
from .models import (
    Quiz,
    Categorie,
    Question,
    Field,
    FurtherAnswer,
    MyUser,
    DefaultAnswer,
    Team,
    TeamMember,
    Image,
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator


# Serializer contain the model and the fields of the model which are accessed when using the serializer
# Serializers can be nested by assigning a serializer to a variable
# The Variable has to be named like the related_name of the foreign key in the models
# When using nested serializers or when wanting to interfere with the creation/updating of instances
# you can modify the create or update method, respectively


class QuizTeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("id", "team_name", "team_points")


class QuizSerializer(serializers.ModelSerializer):
    team_quiz = QuizTeamsSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = (
            "id",
            "quiz_name",
            "pub_date",
            "nr_of_rows",
            "nr_of_categories",
            "author",
            "team_quiz",
        )


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ("id", "categorie_name", "author")


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class ImageAuthorSerializer(serializers.ModelSerializer):
    image_author = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = MyUser
        fields = ("id", "username", "image_author")


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurtherAnswer
        fields = ("text", "is_correct", "answer_image")


class DefaultAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultAnswer
        fields = "__all__"

    def create(self, validated_data: dict):
        super.create(validated_data)


class QuestionSerializer(serializers.ModelSerializer):
    question_answer_option = AnswerSerializer(many=True, required=False)
    default_answer = DefaultAnswerSerializer()

    class Meta:
        model = Question
        fields = (
            "id",
            "question_text",
            "question_image",
            "pub_date",
            "author",
            "multiplayer",
            "question_type",
            "default_answer",
            "question_answer_option",
        )

    def create(self, validated_data: dict):
        default_answer = validated_data.pop("default_answer")

        # if multiple choice/multiple answer options they will be stored in a list
        answer_option_list = []
        if validated_data.get("question_answer_option"):
            answer_option_list = validated_data.pop("question_answer_option")

        default_answer_instance = DefaultAnswer.objects.create(
            text=default_answer.get("text"),
            is_correct=default_answer.get("is_correct", True),
            answer_image=default_answer.get("answer_image"),
        )

        validated_data["default_answer"] = default_answer_instance

        # creates the question except for the answer options in multiple choice questions
        created_question = super().create(validated_data)

        for answer_option in answer_option_list:
            FurtherAnswer.objects.create(
                text=answer_option.get("text"),
                is_correct=answer_option.get("is_correct", False),
                question_id=created_question.id,
                answer_image=answer_option.get("answer_image"),
            )

        return created_question

    def update(self, instance, validated_data):
        # deletes all answer options associated with this question
        if validated_data.get("question_answer_option"):
            FurtherAnswer.objects.filter(question_id=instance.id).delete()
        # updates variables
        instance.id = validated_data.get("id", instance.id)
        instance.question_text = validated_data.get(
            "question_text", instance.question_text
        )
        instance.author = validated_data.get("author", instance.author)
        instance.question_image = validated_data.get(
            "question_image", instance.question_image
        )
        instance.multiplayer = validated_data.get("multiplayer", instance.multiplayer)
        instance.question_type = validated_data.get(
            "question_type", instance.question_type
        )
        # updates default answer
        default_answer = validated_data.pop("default_answer")
        default_answer_orig = instance.default_answer
        default_answer_instance = DefaultAnswer.objects.get(id=default_answer_orig.id)
        default_answer_instance.text = default_answer.get("text")
        default_answer_instance.answer_image = default_answer.get("answer_image")
        default_answer_instance.save()
        instance.default_answer = default_answer_instance
        # creates new answer options for multiple choice questions
        answer_option_list = []
        if validated_data.get("question_answer_option"):
            answer_option_list = validated_data.pop("question_answer_option")

        for answer_option in answer_option_list:
            FurtherAnswer.objects.create(
                text=answer_option.get("text"),
                is_correct=answer_option.get("is_correct", False),
                question_id=instance.id,
                answer_image=answer_option.get("answer_image"),
            )
        instance.save()
        return instance


class FieldSerializer(serializers.ModelSerializer):
    categorie_name = serializers.ReadOnlyField(source="categorie.categorie_name")
    question_id = serializers.IntegerField(source="question.id", allow_null=True)
    question = QuestionSerializer(read_only=True)

    class Meta:
        model = Field
        fields = (
            "id",
            "point",
            "categorie",
            "categorie_name",
            "quiz",
            "question_id",
            "question",
        )

    def create(self, validated_data: dict):
        question_instance = validated_data.get("question")
        # to prevent trying to get a question with id==none
        if question_instance.get("id") is not None:
            question_instance = Question.objects.get(id=question_instance.get("id"))
        else:
            question_instance = None

        created_field = Field.objects.create(
            point=validated_data.get("point"),
            categorie=validated_data.get("categorie"),
            question=question_instance,
            quiz=validated_data.get("quiz"),
        )
        return created_field

    def update(self, instance, validated_data):
        instance.point = validated_data.get("point", instance.point)
        instance.categorie = validated_data.get("categorie", instance.categorie)
        instance.quiz = validated_data.get("quiz", instance.quiz)

        question_instance = validated_data.get("question")
        question_instance = Question.objects.get(id=question_instance.get("id"))
        instance.question = question_instance

        instance.save()
        return instance


class WholeQuizSerializer(serializers.ModelSerializer):
    field_quiz = FieldSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = (
            "id",
            "quiz_name",
            "pub_date",
            "nr_of_rows",
            "nr_of_categories",
            "field_quiz",
        )


class AuthorAssociatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = (
            "id",
            "quiz_name",
            "pub_date",
            "nr_of_rows",
            "nr_of_categories",
            "author",
        )


class QuizAuthorSerializer(serializers.ModelSerializer):
    quiz_author = AuthorAssociatedSerializer(read_only=True, many=True)

    class Meta:
        model = MyUser
        fields = ("id", "username", "quiz_author")


class QuestionAuthorSerializer(serializers.ModelSerializer):
    question_author = QuestionSerializer(read_only=True, many=True)

    class Meta:
        model = MyUser
        fields = ("id", "username", "question_author")


class CategorieAuthorSerializer(serializers.ModelSerializer):
    categorie_author = CategorieSerializer(read_only=True, many=True)

    class Meta:
        model = MyUser
        fields = ("id", "username", "categorie_author")


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # custom claims
        token["username"] = user.username
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=MyUser.objects.all())]
    )

    class Meta:
        model = MyUser
        fields = ("username", "password", "password2", "email")

    # validates whether the passwords entered into both fields are the same
    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = MyUser.objects.create(
            username=validated_data["username"], email=validated_data["email"]
        )

        user.set_password(validated_data["password"])
        user.save()

        return user


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ("username", "is_guest")
        read_only_fields = ("is_guest",)

    def create(self, validated_data):
        user = MyUser.objects.create(username=validated_data["username"], is_guest=True)

        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ("id", "username", "is_guest", "is_superuser", "points", "email")


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ("id", "team", "member", "quiz")
        read_only_fields = ("team", "quiz", "id")


class TeamNameMemberSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="member.username")

    class Meta:
        model = TeamMember
        fields = ("id", "team", "member", "quiz", "username")
        read_only_fields = ("team", "quiz", "id", "username")


class TeamSerializer(serializers.ModelSerializer):
    teamMember_team = TeamNameMemberSerializer(many=True, required=False)

    class Meta:
        model = Team
        fields = ("id", "team_name", "team_points", "quiz", "teamMember_team")

    def create(self, validated_data: dict):
        # saves teammembers in list
        team_member_list = []
        if validated_data.get("teamMember_team"):
            team_member_list = validated_data.pop("teamMember_team")

        created_team = super().create(validated_data)

        # creates a teammember for each user in team_member_list
        for teammember in team_member_list:
            TeamMember.objects.create(
                quiz=created_team.quiz,
                member=teammember.get("member"),
                team=created_team,
            )

        return created_team

    def update(self, instance, validated_data):
        # deletes teammembers
        TeamMember.objects.filter(team=instance.id).delete()
        # updates variables
        instance.id = validated_data.get("id", instance.id)
        instance.quiz = validated_data.get("quiz", instance.quiz)
        instance.team_name = validated_data.get("team_name", instance.team_name)
        instance.team_points = validated_data.get("team_points", instance.team_points)

        team_member_list = []
        if validated_data.get("teamMember_team"):
            team_member_list = validated_data.pop("teamMember_team")
        # recreates teammembers for updated team
        for teammember in team_member_list:
            TeamMember.objects.create(
                quiz=instance.quiz, member=teammember.get("member"), team=instance
            )

        instance.save()
        return instance


class TeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ("id", "team", "member", "quiz")
        read_only_fields = ("team", "quiz", "id")


class AddTeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ("id", "team", "member", "quiz")
        read_only_fields = ("id", "quiz")

    def create(self, validated_data: dict):
        team_instance = validated_data.get("team")

        created_member = TeamMember.objects.create(
            team=team_instance,
            member=validated_data.get("member"),
            quiz=team_instance.quiz,
        )
        return created_member


class AddPointSerializer(serializers.ModelSerializer):
    # team_id = TeamSerializer(read_only = True)

    class Meta:
        model = Team
        fields = ("id", "team_points", "quiz")
        read_only_fields = ("id", "quiz")

    def update(self, instance, validated_data):
        instance.team_points = validated_data.get("team_points", instance.team_points)
        instance.team_name = validated_data.get("team_name", instance.team_name)
        instance.quiz = validated_data.get("quiz", instance.quiz)
        instance.save()
        return instance
