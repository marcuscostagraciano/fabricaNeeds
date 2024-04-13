from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from FabricaNeeds.models import Balance

class BalanceSerializer(ModelSerializer):
    class Meta:
        model = Balance
        fields = '__all__'