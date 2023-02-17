from django.db import models


class Arrival(models.Model):
    arrivedAt = models.DateTimeField()
    name = models.CharField(max_length=20)

    class Meta:
        ordering = ['arrivedAt']
