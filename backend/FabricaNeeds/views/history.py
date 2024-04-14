from rest_framework import generics
from .models import History
from .serializers import HistorySerializer

class HistoryViewSet(ModelViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer
    http_method_names = ['get', 'put', 'post', 'delete']
