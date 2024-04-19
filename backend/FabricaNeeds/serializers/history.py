from rest_framework.serializers import ModelSerializer

from FabricaNeeds.models import History


class HistorySerializer(ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'date', 'user', 'item', 'justification']
