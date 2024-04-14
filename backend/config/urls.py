from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from FabricaNeeds.views import ItemViewSet
from FabricaNeeds.views import BalanceViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'balance', BalanceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
