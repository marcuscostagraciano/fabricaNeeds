from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from FabricaNeeds.models import Balance


class BalanceSerializer(ModelSerializer):
    def update(self, instance, validated_data):
        value_to_add = validated_data.pop("value")
        if value_to_add:
            instance.value += value_to_add
            instance.save()
        return instance

    class Meta:
        model = Balance
        fields = "__all__"
