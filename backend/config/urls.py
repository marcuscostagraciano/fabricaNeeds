from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from FabricaNeeds.views import ItemViewSet

router = DefaultRouter()
router.register(r'itens', ItemViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
