from django.db import models
from FabricaNeeds.models import Item
from django.contrib.auth.models import User

class History(models.Model):
    date = models.DateTimeField(auto_now=True) 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    justification = models.CharField(max_length=255, blank=True)

    def __str__(self) -> str:
        return f"{self.date} - {self.user} - {self.item}"

    class Meta:
        verbose_name = 'History'
        verbose_name_plural = 'Histories'
