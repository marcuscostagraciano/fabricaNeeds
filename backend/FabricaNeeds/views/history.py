from rest_framework.viewsets import ModelViewSet

from FabricaNeeds.models import History
from FabricaNeeds.serializers import HistorySerializer


class HistoryViewSet(ModelViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    http_method_names = ['get', 'put', 'post', 'delete']
