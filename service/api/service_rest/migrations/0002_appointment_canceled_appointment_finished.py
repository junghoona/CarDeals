# Generated by Django 4.0.3 on 2023-07-25 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='canceled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='appointment',
            name='finished',
            field=models.BooleanField(default=False),
        ),
    ]