# Generated by Django 3.2.23 on 2023-12-14 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_auto_20231212_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='coin',
            field=models.IntegerField(default=0, max_length=999999),
        ),
    ]
