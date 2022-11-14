from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 

class Quiz(models.Model):
    quiz_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published',auto_now_add=True)
    last_edit = models.DateTimeField('date published',auto_now=True)
    nr_of_rows = models.PositiveIntegerField(default=5,validators=[MinValueValidator(1), MaxValueValidator(10)])
    nr_of_categories = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    def __str__(self):
        return self.quiz_name

class Categorie(models.Model):
    categorie_name=models.CharField(max_length=200)
    def __str__(self):
        return self.categorie_name


class Question(models.Model):
    question_text=models.CharField(max_length=500)
    answer_text=models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published',auto_now_add=True)
    last_edit = models.DateTimeField('date published',auto_now=True)
    def __str__(self):
        return self.question_text

class Field(models.Model):
    point = models.PositiveIntegerField(default=100, validators=[MaxValueValidator(1000)])
    question = models.ForeignKey(Question, on_delete=models.CASCADE) 
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,related_name='quiz_field')