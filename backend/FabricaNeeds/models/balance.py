from django.db import models


class Balance(models.Model):
    value: float = models.DecimalField(max_digits=7, decimal_places=2, default=0)

    class Meta:
        verbose_name = "Balance"
        verbose_name_plural = "Balances"
