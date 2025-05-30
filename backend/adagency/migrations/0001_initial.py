# Generated by Django 5.2 on 2025-04-23 12:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('daily_budget', models.DecimalField(decimal_places=2, max_digits=10)),
                ('monthly_budget', models.DecimalField(decimal_places=2, max_digits=12)),
                ('daily_spend', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('monthly_spend', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
            ],
        ),
        migrations.CreateModel(
            name='Campaign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('start_hour', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('end_hour', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('brand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='campaigns', to='adagency.brand')),
            ],
        ),
    ]
