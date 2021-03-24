from rest_framework import viewsets
from backend.serializers import TrafficSignSignalSerializer
from backend.models import TrafficSignClasses
from django.http import Http404, JsonResponse

class TrafficSignViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = TrafficSignClasses.objects.all()
    serializer_class = TrafficSignSignalSerializer

@api_view(["GET"])
def train(model_id):
    # out=trainModel(model_id) 
    
    return JsonResponse(out,safe=False)

@api_view(["GET"])
def getPrediction(image_name):
    # class_id=getPredict(data) 
    
    return JsonResponse(class_id,safe=False)