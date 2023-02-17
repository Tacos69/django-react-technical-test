from rest_framework import serializers
from .models import Arrival


class ArrivalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Arrival
        fields = ['id', 'arrivedAt', 'name']
