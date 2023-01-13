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

# Used to nest FurtherAnswer into Question on Admin page
class FurtherAnswerInline(admin.TabularInline):
    model = FurtherAnswer
    extra = 0


# Manual configs for Further Answer on Admin Page
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            None,
            {
                # register fields from Question to show up on Admin Page
                "fields": [
                    "question_text",
                    "author",
                    "multiplayer",
                    "question_type",
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


class QuizAdmin(admin.ModelAdmin):
    # register fields from Quiz to show up on Admin Page
    fieldsets = [
        (None, {"fields": ["quiz_name", "author", "nr_of_rows", "nr_of_categories"]}),
    ]
    # nests Field and Team into Quiz
    inlines = [FieldInline, TeamInLine]
    list_display = ("quiz_name",)
    list_filter = ["pub_date"]
    search_fields = ["quiz_name"]


# All models registered here will show up on admin page and allows the admin to edit it
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Categorie)
admin.site.register(DefaultAnswer)
admin.site.register(MyUser)
admin.site.register(Team)
admin.site.register(TeamMember)
