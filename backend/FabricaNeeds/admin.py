from django.contrib import admin

from .models import Item
from .models import Balance
from .models import History

admin.site.register(Balance)
admin.site.register(Item)
admin.site.register(History)
