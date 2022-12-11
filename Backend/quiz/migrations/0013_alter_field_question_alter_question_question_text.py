# Generated by Django 4.1.3 on 2022-12-11 11:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0012_alter_field_categorie_alter_field_question_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='field',
            name='question',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='field_question', to='quiz.question'),
        ),
        migrations.AlterField(
            model_name='question',
            name='question_text',
            field=models.CharField(blank=True, default='', max_length=500),
        ),
    ]
