# Generated by Django 2.2 on 2020-06-16 07:13

import ckeditor.fields
import ckeditor_uploader.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_auto_20200615_2106'),
    ]

    operations = [
        migrations.RenameField(
            model_name='courses',
            old_name='course_description',
            new_name='course_short_description',
        ),
        migrations.AddField(
            model_name='courses',
            name='course_long_description',
            field=ckeditor_uploader.fields.RichTextUploadingField(default=12.23),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='courses',
            name='will_learn',
            field=ckeditor.fields.RichTextField(default=12.23),
            preserve_default=False,
        ),
    ]
