from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounts import views
from arrivals import views as arrivals

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'arrivals', arrivals.ArrivalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
]
