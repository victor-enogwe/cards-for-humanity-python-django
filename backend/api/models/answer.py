from api.models.timestamp import TimestampBase
from api.utils.enums import CardRating
from api.utils.validators import min_max_validator
from django.db import models
from pgtrigger import Protect, Update, register
from pgtrigger.core import Delete


@register(
    Protect(name="protect_fields_answer", operation=Update | Delete),
)
class Answer(TimestampBase):
    player = models.ForeignKey("api.Player", on_delete=models.CASCADE)
    game = models.ForeignKey("api.Game", on_delete=models.CASCADE)
    question = models.ForeignKey("api.Question", on_delete=models.CASCADE)
    card = models.ForeignKey("api.WhiteCard", on_delete=models.CASCADE)
    rating = models.CharField(
        max_length=6, choices=CardRating.choices(), default=CardRating.NORMAL
    )
    round = models.SmallIntegerField(
        default=0,
        validators=min_max_validator(1, 50),
        help_text="game round",
        editable=False,
    )

    objects = models.Manager()

    def __str__(self):
        return "{0}: {1}".format(self.Meta.__name__, self.card.text)

    class Meta:
        constraints = [
            # restrict duplicate answer
            models.UniqueConstraint(
                name="unique_answer_player_game_round",
                fields=(
                    "game",
                    "card",
                    "round",
                ),
            ),
        ]
