from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from FabricaNeeds.models import Item

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ('name', 'ativo',)
