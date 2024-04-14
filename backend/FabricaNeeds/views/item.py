from rest_framework.viewsets import ModelViewSet

from FabricaNeeds.models import Item
from FabricaNeeds.serializers import ItemSerializer, CriarItemSerializer

class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CriarItemSerializer
        return ItemSerializer