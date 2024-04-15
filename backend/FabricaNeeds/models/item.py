from django.db import models


class Item(models.Model):
    name: str = models.CharField(primary_key=True, max_length=16)
    active: bool = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"
