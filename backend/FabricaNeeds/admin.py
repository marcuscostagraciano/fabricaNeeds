from django.contrib import admin

from .models import Item
from .models import Balance
from .models import history

admin.site.register(Item)
admin.site.register(Balance)