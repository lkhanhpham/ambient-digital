from django.contrib import admin

from .models import Question, Quiz, Field, Categorie, FurtherAnswer, DefaultAnswer, MyUser, Team, TeamMember
class FurtherAnswerInline(admin.TabularInline):
    model=FurtherAnswer
    extra=0

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text','author','multiplayer','question_type','default_answer']}),
    ]
    inlines = [FurtherAnswerInline]
    list_display = ('question_text',)
    list_filter = ['pub_date']
    search_fields = ['question_text'] 

class FieldInline(admin.TabularInline):
    model = Field
    extra = 0

class QuizAdmin(admin.ModelAdmin):

    fieldsets = [
        (None,               {'fields': ['quiz_name','author','nr_of_rows','nr_of_categories']}),
    ]
    inlines = [FieldInline]
    list_display = ('quiz_name',)
    list_filter = ['pub_date']
    search_fields = ['quiz_name'] 

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question,QuestionAdmin)
admin.site.register(Categorie)
admin.site.register(DefaultAnswer)
admin.site.register(MyUser)
admin.site.register(Team)
admin.site.register(TeamMember)
