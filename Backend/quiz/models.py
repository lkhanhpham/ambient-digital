from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)
    birth_date = models.DateField(null=True, blank=True)
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Quiz(models.Model):
    quiz_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published',auto_now_add=True)
    last_edit = models.DateTimeField('date published',auto_now=True)
    nr_of_rows = models.PositiveIntegerField(default=5,validators=[MinValueValidator(1), MaxValueValidator(10)])
    nr_of_categories = models.PositiveIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(10)])
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)
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
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,)
    default_answer=models.ForeignKey(DefaultAnswer,on_delete=models.CASCADE)
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

    def __str__(self):
        return self.question_text

class FurtherAnswer(models.Model):
    text=models.CharField(max_length=500)
    question=models.ForeignKey(Question,on_delete=models.CASCADE,)
    is_correct =models.BooleanField(default=False)

    def clean(self):
        from django.core.exceptions import ValidationError
        if not (self.question.question_type == 'MC'):
            raise ValidationError('not multiple choice')

    def __str__(self):
        return self.text


class Field(models.Model):
    point = models.PositiveIntegerField(default=100, validators=[MaxValueValidator(1000)])
    question = models.ForeignKey(Question, on_delete=models.CASCADE) 
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE,related_name='quiz_field')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['quiz', 'question'], name='unique_question_quiz')
        ]