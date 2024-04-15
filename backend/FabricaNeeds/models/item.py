from django.db import models


class Item(models.Model):
    name: str = models.CharField(max_length=16, blank=False, unique=True)
    active: bool = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"
