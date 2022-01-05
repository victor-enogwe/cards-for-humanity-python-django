# Generated by Django 3.2.10 on 2022-01-02 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_auto_20220101_2205"),
    ]

    operations = [
        migrations.AlterField(
            model_name="game",
            name="status",
            field=models.CharField(
                choices=[
                    ("Awaiting Answers", "GAA"),
                    ("Awaiting Czar Answers", "GACA"),
                    ("Awaiting Czar Question", "GACQ"),
                    ("Awaiting Players", "GAP"),
                    ("Game Canceled", "GC"),
                    ("Game Ended", "GE"),
                    ("Game Started", "GS"),
                ],
                default="Awaiting Players",
                max_length=22,
            ),
        ),
    ]
