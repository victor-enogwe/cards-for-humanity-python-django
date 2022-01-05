# Generated by Django 3.2.10 on 2022-01-04 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0012_alter_game_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="game",
            name="status",
            field=models.CharField(
                choices=[
                    ("Awaiting Czar Answers", "GACA"),
                    ("Awaiting Czar Question", "GACQ"),
                    ("Awaiting Players", "GAP"),
                    ("Awaiting Player Answers", "GAPA"),
                    ("Game Canceled", "GC"),
                    ("Game Ended", "GE"),
                    ("Game Started", "GS"),
                    ("Show Round Result", "GSRR"),
                ],
                default="Awaiting Players",
                max_length=23,
            ),
        ),
    ]
