from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from FabricaNeeds.models import history

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'date', 'user', 'item', 'justification']
