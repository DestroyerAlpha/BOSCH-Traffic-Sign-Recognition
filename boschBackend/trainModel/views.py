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
        trainRatio = int(data.POST.get("training_percentage"))

        rtn = "testing"
        return JsonResponse(rtn,safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)