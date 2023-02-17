# Generated by Django 4.1.7 on 2023-02-16 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Arrival',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('arrivedAt', models.DateTimeField()),
                ('name', models.CharField(max_length=20)),
            ],
            options={
                'ordering': ['arrivedAt'],
            },
        ),
    ]
