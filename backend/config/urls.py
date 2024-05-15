from django.contrib import admin
from django.urls import path, include

from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from FabricaNeeds.views import (
    BalanceViewSet,
    ItemViewSet,
    HistoryViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register(r"balance", BalanceViewSet)
router.register(r"items", ItemViewSet)
router.register(r"history", HistoryViewSet)
router.register(r"user", UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
