# Generated by Django 5.1 on 2024-09-07 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.CharField(default='no image', max_length=60),
            preserve_default=False,
        ),
    ]
