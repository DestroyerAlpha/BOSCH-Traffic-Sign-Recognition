from rest_framework import viewsets
from backend.serializers import TrafficSignSignalSerializer
from backend.models import TrafficSignClasses

class TrafficSignViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = TrafficSignClasses.objects.all()
    serializer_class = TrafficSignSignalSerializer
