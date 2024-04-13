from django.contrib import admin

from .models import Item
from .models import Balance

admin.site.register(Item)
admin.site.register(Balance)