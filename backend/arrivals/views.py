from .models import Arrival
from .serializers import ArrivalSerializer
from rest_framework import viewsets, permissions


class ArrivalViewSet(viewsets.ModelViewSet):
    queryset = Arrival.objects.all()
    serializer_class = ArrivalSerializer
    permission_classes = [permissions.IsAuthenticated]
