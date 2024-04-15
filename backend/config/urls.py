from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from FabricaNeeds.views import ItemViewSet
from FabricaNeeds.views import BalanceViewSet

router = DefaultRouter()
router.register(r"items", ItemViewSet)
router.register(r"balance", BalanceViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
