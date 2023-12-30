# Generated by Django 5.0 on 2023-12-30 13:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('short_description', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('creation', models.IntegerField()),
                ('last_update', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='article/')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='event/')),
            ],
        ),
        migrations.CreateModel(
            name='ActionFigure',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='LQEsite.product')),
                ('image', models.ImageField(blank=True, null=True, upload_to='actionfigure/')),
            ],
            bases=('LQEsite.product',),
        ),
        migrations.CreateModel(
            name='Comic',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='LQEsite.product')),
                ('image', models.ImageField(blank=True, null=True, upload_to='comic/')),
            ],
            bases=('LQEsite.product',),
        ),
        migrations.CreateModel(
            name='Gadget',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='LQEsite.product')),
                ('image', models.ImageField(blank=True, null=True, upload_to='gadget/')),
            ],
            bases=('LQEsite.product',),
        ),
        migrations.CreateModel(
            name='Manga',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='LQEsite.product')),
                ('image', models.ImageField(blank=True, null=True, upload_to='manga/')),
            ],
            bases=('LQEsite.product',),
        ),
        migrations.CreateModel(
            name='RoleGame',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='LQEsite.product')),
                ('image', models.ImageField(blank=True, null=True, upload_to='rolegame/')),
            ],
            bases=('LQEsite.product',),
        ),
        migrations.CreateModel(
            name='TableGame',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='LQEsite.product')),
                ('image', models.ImageField(blank=True, null=True, upload_to='tablegame/')),
            ],
            bases=('LQEsite.product',),
        ),
        migrations.CreateModel(
            name='Showcase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
                ('products', models.ManyToManyField(to='LQEsite.product')),
            ],
        ),
    ]