from django.db import models
from FabricaNeeds.models import Item
from django.contrib.auth.models import User


class History(models.Model):
    date = models.DateTimeField(auto_now=True) 
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    justification = models.CharField(max_length=255, blank=True)

    def __str__(self) -> str:
        return f"{self.date} - {self.user} - {self.item}"

    class Meta:
        verbose_name = 'History'
        verbose_name_plural = 'Histories'


class ItemsHistory(models.Model):
    history = models.ForeignKey(History, on_delete=models.CASCADE, related_name='items')
    item = models.ForeignKey(Item, on_delete=models.PROTECT, related_name='+')
    price = models.DecimalField(max_digits=7, decimal_places=2, default=0)
