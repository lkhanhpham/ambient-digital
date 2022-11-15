from django.contrib import admin

from .models import Question, Quiz, Field, Profile, Categorie

class FieldInline(admin.TabularInline):
    model = Field
    extra = 0

class QuizAdmin(admin.ModelAdmin):

    fieldsets = [
        (None,               {'fields': ['quiz_name']}),
    ]
    inlines = [FieldInline]
    list_display = ('quiz_name',)
    list_filter = ['pub_date']
    search_fields = ['quiz_name'] 

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question)
admin.site.register(Profile)
admin.site.register(Categorie)
