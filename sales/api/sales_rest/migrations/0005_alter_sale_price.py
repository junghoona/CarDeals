# Generated by Django 4.0.3 on 2023-07-26 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_alter_sale_automobile_alter_sale_customer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='price',
            field=models.FloatField(),
        ),
    ]