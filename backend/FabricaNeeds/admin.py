from django.contrib import admin

from .models import (
    Item,
    Balance,
    History,
    ItemsHistory,
)

admin.site.register(Item)
admin.site.register(Balance)


class ItemsHistoryInline(admin.TabularInline):
    model = ItemsHistory


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    inlines = [ItemsHistoryInline]
    ordering = ('date',)
