# Generated by Django 4.0.3 on 2023-07-25 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_appointment_canceled_appointment_finished'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='canceled',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='finished',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
