# Generated by Django 4.1.3 on 2022-11-25 15:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('quiz', '0011_alter_furtheranswer_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='field',
            name='categorie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='field_categorie', to='quiz.categorie'),
        ),
        migrations.AlterField(
            model_name='field',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='field_question', to='quiz.question'),
        ),
        migrations.AlterField(
            model_name='field',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='field_quiz', to='quiz.quiz'),
        ),
        migrations.AlterField(
            model_name='furtheranswer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_answer_option', to='quiz.question'),
        ),
        migrations.AlterField(
            model_name='question',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_author', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='question',
            name='default_answer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='question_default_answer', to='quiz.defaultanswer'),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_author', to=settings.AUTH_USER_MODEL),
        ),
    ]
