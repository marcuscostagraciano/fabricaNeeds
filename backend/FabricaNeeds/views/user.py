from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from django.contrib.auth.models import User
from FabricaNeeds.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    permission_classes = [AllowAny]    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ['post']
