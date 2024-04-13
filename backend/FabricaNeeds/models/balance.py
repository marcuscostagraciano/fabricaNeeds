from django.db import models

class Balance(models.Model):
    value: float = models.FloatField(blank=False, default=0)

    class Meta:
        verbose_name = 'Balance'
        verbose_name_plural = 'Balances'