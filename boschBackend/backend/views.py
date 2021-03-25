from pathlib import Path
from rest_framework import viewsets
import imageio
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
def addClasses(request):
    if request.POST:
        newclass = TrafficSignClasses()
        className = request.POST.get("className")
        newclass.className = className
        image = request.FILES["classImg"]
        image = imageio.imread(image)
        print(className)
        print(image)
        newclass.classImgCount = 0
        newclass.classAugLinks = []
        newclass.save()
        newclass = TrafficSignClasses.objects.get(className=className)
        classID = newclass.id
        Path("Images/Uploaded/" + str(classID)).mkdir(parents=True, exist_ok=True)
        classImgURL = "Images/Uploaded/" + str(classID) + "/0.png"
        imageio.imwrite(classImgURL, image)
        newclass.classImgSrc = classImgURL
        newclass.save()
    return redirect('/getClasses')

