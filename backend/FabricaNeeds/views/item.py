from rest_framework.viewsets import ModelViewSet

from FabricaNeeds.models import Item
from FabricaNeeds.serializers import ItemSerializer


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
