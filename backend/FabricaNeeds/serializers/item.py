from rest_framework.serializers import ModelSerializer

from FabricaNeeds.models import Item


class ItemSerializer(ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"
