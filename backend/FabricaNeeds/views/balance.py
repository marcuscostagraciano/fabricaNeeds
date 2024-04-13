from rest_framework.viewsets import ModelViewSet

from FabricaNeeds.models import Balance
from FabricaNeeds.serializers import BalanceSerializer

class BalanceViewSet(ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer