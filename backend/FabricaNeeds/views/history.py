from rest_framework.viewsets import ModelViewSet

from FabricaNeeds.models import History
from FabricaNeeds.serializers import HistorySerializer, CriarEditarHistorySerializer


class HistoryViewSet(ModelViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    http_method_names = ['get', 'put', 'post', 'delete']

    def get_serializer_class(self):
        return CriarEditarHistorySerializer if self.action in ('create', 'update') else HistorySerializer