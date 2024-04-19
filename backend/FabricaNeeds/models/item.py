from django.db import models
from datetime import datetime


class Item(models.Model):
    name: str = models.CharField(max_length=16, blank=False, unique=True)
    active: bool = models.BooleanField(default=False)
    last_update: str = models.DateTimeField()

    def save(self, *args, **kwargs):
        self.last_update = datetime.now()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"
