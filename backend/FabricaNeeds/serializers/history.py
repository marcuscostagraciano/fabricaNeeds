from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from django.contrib.auth.models import User

from functools import reduce

from FabricaNeeds.models import History, ItemsHistory


class ItemsHistorySerializer(ModelSerializer):
    class Meta:
        model = ItemsHistory
        fields = ('item', 'price',)


class HistorySerializer(ModelSerializer):
    items = ItemsHistorySerializer(many=True)
    
    class Meta:
        model = History
        fields = ['id', 'date', 'user', 'value', 'items', 'justification']
        depth = 1


class CriarEditarHistorySerializer(ModelSerializer):
    items = ItemsHistorySerializer(many=True, required=False)
    date = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        items = validated_data.pop('items')
        if items:
            validated_data.pop('value')
            history = History.objects.create(**validated_data, value=((-1)*(reduce(lambda a, b: a+b, [item['price'] for item in items]))))
            for item in items:
                ItemsHistory.objects.create(history=history, **item)
        else:
            history = History.objects.create(**validated_data)
        history.save()
        return history

    class Meta:
        model = History
        fields = ('date', 'user', 'value', 'items', 'justification',)
