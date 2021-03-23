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
import numpy as np
import imgaug as ia
import imgaug.augmenters as iaa
from PIL import Image
import imageio
import glob

@api_view(["POST"])
def ImageAug(data):
    try:
        imgLoc = data.POST.get("loc")
        className = data.POST.get("class")
        multiplier = data.POST.get("multiplier")
        if(multiplier == None):
            multiplier = 16
        else:
            multiplier = int(multiplier)
        storageLoc = "Images/Augmented/" +str(className) + "/"
        ia.seed(1)
        try:
            im = imageio.imread(imgLoc)
            num_of_files = len(glob.glob(storageLoc + '*'))
            print(num_of_files)
            images = np.array([im for _ in range(multiplier)],dtype=np.uint8)
    
            seq = iaa.Sequential([
                iaa.Fliplr(0.5), # horizontal flips
                iaa.Crop(percent=(0, 0.1)), # random crops
                # Small gaussian blur with random sigma between 0 and 0.5.
                # But we only blur about 50% of all images.
                iaa.Sometimes(
                    0.5,
                    iaa.GaussianBlur(sigma=(0, 0.5))
                ),
                # Strengthen or weaken the contrast in each image.
                iaa.LinearContrast((0.75, 1.5)),
                # Add gaussian noise.
                # For 50% of all images, we sample the noise once per pixel.
                # For the other 50% of all images, we sample the noise per pixel AND
                # channel. This can change the color (not only brightness) of the
                # pixels.
                iaa.AdditiveGaussianNoise(loc=0, scale=(0.0, 0.05*255), per_channel=0.5),
                # Apply affine transformations to each image.
                # Scale/zoom them, translate/move them, rotate them and shear them.
                iaa.Affine(
                    scale={"x": (0.9, 1.1), "y": (0.9, 1.1)},
                    translate_percent={"x": (-0.1, 0.1), "y": (-0.1, 0.1)},
                    rotate=(-25, 25),
                    shear=(-8, 8)
                )
            ], random_order=True) # apply augmenters in random order

            images_aug = seq(images=images)
            nameFile = int(num_of_files) + 1
            for i in images_aug:
                imageio.imwrite(storageLoc + str(nameFile) + ".png",i)
                nameFile = nameFile + 1
            rtn = "Successfully stored and augmented the given image " + str(multiplier) + " number of times!"
        except :
            rtn = "Error Happened!"
        
        
        return JsonResponse(rtn,safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)