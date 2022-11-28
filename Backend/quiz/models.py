from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.db.models.signals import post_save
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    points = models.PositiveIntegerField(default=0)
    birth_date = models.DateField(null=True, blank=True)
    is_guest =models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Quiz(models.Model):
    quiz_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published',auto_now_add=True)
    last_edit = models.DateTimeField('date published',auto_now=True)
    nr_of_rows = models.PositiveIntegerField(default=5,validators=[MinValueValidator(1), MaxValueValidator(10)])
    nr_of_categories = models.PositiveIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(10)])
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='quiz_author')
    def __str__(self):
        return self.quiz_name

class Categorie(models.Model):
    categorie_name=models.CharField(max_length=200)
    def __str__(self):
        return self.categorie_name

class DefaultAnswer(models.Model):
    text=models.CharField(max_length=500)
    is_correct =models.BooleanField(default=True)

    def __str__(self):
        return self.text
    
class Question(models.Model):
    MULTI = 'MC'
    SIMPLE = 'SC'
    ESTIMATE = 'EQ'
    question_text=models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published',auto_now_add=True)
    last_edit = models.DateTimeField('date published',auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='question_author')
    default_answer=models.ForeignKey(DefaultAnswer,on_delete=models.CASCADE,related_name='question_default_answer')
    multiplayer= models.BooleanField(default=False)
    QUESTION_CHOICES = [
        (MULTI, 'Multiple choice'),
        (SIMPLE, 'Simple question'),
        (ESTIMATE, 'Estimation question'),
    ]
    question_type = models.CharField(
        max_length=2,
        choices=QUESTION_CHOICES,
        default=SIMPLE,
    )

    def clean(self):
        further_answer_list=[]
        further_answer_list=FurtherAnswer.objects.filter(question=self.id)
        for answers in further_answer_list:
            if not(self.question_type=='MC'):
               from django.core.exceptions import ValidationError 
               raise ValidationError('not multiple choice')

    def save(self, *args,**kwargs):
        self.full_clean()
        return super(Question, self).save(*args,**kwargs)

    def __str__(self):
        return self.question_text

class FurtherAnswer(models.Model):
    text=models.CharField(max_length=500)
    question=models.ForeignKey(Question,on_delete=models.CASCADE,related_name='question_answer_option')
    is_correct =models.BooleanField(default=False)

    def clean(self):
        from django.core.exceptions import ValidationError
        if not (self.question.question_type == 'MC'):
            raise ValidationError('not multiple choice')

    def save(self, *args,**kwargs):
        self.full_clean()
        return super(FurtherAnswer, self).save(*args,**kwargs)

    def __str__(self):
        return self.text


class Field(models.Model):
    point = models.PositiveIntegerField(default=100, validators=[MaxValueValidator(1000)])
    question = models.ForeignKey(Question, on_delete=models.CASCADE,related_name='field_question') 
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE,related_name='field_categorie')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,related_name='field_quiz')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['quiz', 'question'], name='unique_question_quiz')
        ]