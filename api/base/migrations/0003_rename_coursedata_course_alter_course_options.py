# Generated by Django 4.2.2 on 2023-06-27 08:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_coursedata_alter_file_category_delete_category_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CourseData',
            new_name='Course',
        ),
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name': 'Course', 'verbose_name_plural': 'Courses'},
        ),
    ]