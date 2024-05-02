from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from django.contrib.auth.models import User

from FabricaNeeds.models import History, ItemsHistory


class HistorySerializer(ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'date', 'user', 'items', 'justification']
        depth = 1


class ItemsHistorySerializer(ModelSerializer):
    class Meta:
        model = ItemsHistory
        fields = ('item', 'price',)


class CriarEditarHistorySerializer(ModelSerializer):
    items = ItemsHistorySerializer(many=True)
    date = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        items = validated_data.pop('items')
        history = History.objects.create(**validated_data)
        for item in items:
            ItemsHistory.objects.create(history=history, **item)
        history.save()
        return history

    class Meta:
        model = History
        fields = ('date', 'user', 'items', 'justification',)
