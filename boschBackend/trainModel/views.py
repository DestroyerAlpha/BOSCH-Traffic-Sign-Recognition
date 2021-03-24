from django.shortcuts import render
from django.http import Http404, JsonResponse
from django.http import HttpRequest as request
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core import serializers
from django.conf import settings
import json

@api_view(["POST"])
def trainModel(data):
    try:
        epochs = int(data.POST.get("epochs"))
        strides = int(data.POST.get("strides"))
        padding = int(data.POST.get("padding"))
        trainRatio = float(data.POST.get("training_percent"))
        testRatio = float(data.POST.get("testing_percent"))
        poolingType = data.POST.get("pooling_type")
        kernelSize = int(data.POST.get("kernel_size"))
        depth = int(data.POST.get("depth"))
        print('epochs : ',epochs)
        print('strides : ',strides)
        print('padding : ',padding)
        print('trainRatio : ',trainRatio)
        print('testRatio : ',testRatio)
        print('poolingType : ',poolingType)
        print('kernelSize : ',kernelSize)
        print('depth : ',depth)
        rtn = "OK"
        return JsonResponse(rtn,safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)