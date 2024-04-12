from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from FabricaNeeds.models import Item

class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'active',)

class CriarEditarItemSerializer(ModelSerializer):
    def create(self, validated_data):
        return Item.objects.create(**validated_data)

    class Meta:
        model = Item
        fields = ('name',)