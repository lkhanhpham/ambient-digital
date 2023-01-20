from django.contrib import admin

from .models import (
    Question,
    Quiz,
    Field,
    Categorie,
    FurtherAnswer,
    DefaultAnswer,
    MyUser,
    Team,
    TeamMember,
)
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError
from django.contrib.admin import widgets

# Used to nest FurtherAnswer into Question on Admin page
class FurtherAnswerInline(admin.TabularInline):
    model = FurtherAnswer
    extra = 0
    verbose_name = "Further Answers (have to be 3)"
    verbose_name_plural = "Further Answers (have to be 3)"


# Manual configs for Further Answer on Admin Page
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Configurations",
            {
                # register fields from Question to show up on Admin Page
                "fields": [
                    "author",
                    "multiplayer",
                    "question_type",
                ]
            },
        ),
        (
            "Question",
            {
                # register fields from Question to show up on Admin Page
                "fields": [
                    "question_text",
                ]
            },
        ),
        (
            "Default Answer",
            {
                # register fields from Question to show up on Admin Page
                "fields": [
                    "default_answer",
                ]
            },
        ),
    ]
    # nests FurtherAnswer into Question
    inlines = [FurtherAnswerInline]
    list_display = ("question_text",)
    list_filter = ["pub_date"]
    search_fields = ["question_text"]


# Used to nest Team into Quiz on Admin page
class TeamInLine(admin.TabularInline):
    model = Team
    extra = 0


# Used to nest Field into Quiz on Admin page
class FieldInline(admin.TabularInline):
    model = Field
    extra = 0

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.attname == "question_id":
            kwargs["widget"] = FieldWithShortenedQuestionField(
                db_field.remote_field, self.admin_site, using=kwargs.get("using")
            )

        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class FieldWithShortenedQuestionField(widgets.ForeignKeyRawIdWidget):
    """Automatically shorten the question text"""

    def label_and_url_for_value(self, value):
        # Retrieve url for linking the object
        _, url = super().label_and_url_for_value(value)

        # Retrieve the object itself
        key = self.rel.get_related_field().name
        try:
            obj: Question = self.rel.model._default_manager.using(self.db).get(
                **{key: value}
            )
        except (ValueError, self.rel.model.DoesNotExist, ValidationError):
            return "", url

        # Generate new label including the objects shortened text and return label and url
        return f"{obj.question_text[:20]}...", url


class QuizAdmin(admin.ModelAdmin):
    # register fields from Quiz to show up on Admin Page
    fieldsets = [
        (
            "Configurations",
            {
                "fields": [
                    "quiz_name",
                    "author",
                    "nr_of_rows",
                    "nr_of_categories",
                ]
            },
        ),
    ]
    # nests Field and Team into Quiz
    inlines = [FieldInline, TeamInLine]
    list_display = ("quiz_name",)
    list_filter = ["pub_date"]
    search_fields = ["quiz_name"]


class TeammateInLine(admin.TabularInline):
    model = TeamMember
    extra = 0


class TeamAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Configurations",
            {
                "fields": [
                    "team_name",
                    "quiz",
                ]
            },
        )
    ]
    inlines = [TeammateInLine]
    search_fields = ["team_name"]


class UserCustomAdmin(UserAdmin):
    fieldsets = [
        (
            "Login Credentials",
            {
                "fields": [
                    "username",
                    "password",
                ]
            },
        ),
        (
            "Flags",
            {
                "fields": [
                    "is_guest",
                    "is_superuser",
                    "is_staff",
                    "is_active",
                ]
            },
        ),
        (
            "Stats and information",
            {
                "fields": [
                    "points",
                    "first_name",
                    "last_name",
                    "email",
                    "date_joined",
                    "birth_date",
                    "last_login",
                ]
            },
        ),
        (
            "Permissions",
            {
                "fields": [
                    "user_permissions",
                ]
            },
        ),
    ]
    search_fields = ["username"]


class CategorieAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Configurations",
            {
                "fields": [
                    "categorie_name",
                    "author",
                ]
            },
        )
    ]
    search_fields = ["categorie_name"]


class DefAnswerAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}


class TeamMemberAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        """
        Return empty perms dict thus hiding the model from admin index.
        """
        return {}


# All models registered here will show up on admin page and allows the admin to edit it
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Categorie, CategorieAdmin)
admin.site.register(MyUser, UserCustomAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(TeamMember, TeamMemberAdmin)
admin.site.register(DefaultAnswer, DefAnswerAdmin)
admin.site.unregister(Group)
