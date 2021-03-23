from django.shortcuts import render
from django.http import Http404, JsonResponse
from django.http import HttpRequest as request
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,serializers
# from django.core import serializers
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
        className = data.POST.get("class")
        multiplier = data.POST.get("multiplier")
        hflip = int(data.POST.get("hflip"))
        vflip = int(data.POST.get("vflip"))
        crop = float(data.POST.get("crop"))
        blur = float(data.POST.get("blur"))
        contrast = float(data.POST.get("contrast"))
        scale = float(data.POST.get("scale"))
        translate = float(data.POST.get("translate"))
        rotate = float(data.POST.get("rotate"))
        shear = float(data.POST.get("shear"))
        print("\nhflip",hflip)
        print("\nvflip",vflip)
        print("\ncrop",crop)
        print("\nblur",blur)
        print("\ncontrast",contrast)
        print("\nscale",scale)
        print("\ntranslate",translate)
        print("\nrotate",rotate)
        print("\nshear",shear)
        
        if(multiplier == None):
            multiplier = 16
        else:
            multiplier = int(multiplier)
        
        #storage location 
        uploadedStorage = "Images/Uploaded/" + str(className) + "/"
        storageLoc_aug = "Images/Augmented/classBased/" +str(className) + "/"
        commonStorage = "Images/Augmented/mixed/"
        num_of_files_aug = len(glob.glob(storageLoc_aug + '*'))
        num_of_files_uploaded = len(glob.glob(uploadedStorage + '*'))
        nameFile = int(num_of_files_aug) + 1
        nameUploaded = int(num_of_files_uploaded) + 1

        # number of images already present
        numImages = int(data.POST.get("numImages"))
        
        #augmentation
        ia.seed(1)
        seq = iaa.Sequential([
            iaa.Sometimes(
                0.2,
                iaa.Flipud(vflip), # vertical flips
            ),
            iaa.Sometimes(
                0.2,
                iaa.Fliplr(hflip), # horizontal flips
            ),
            iaa.Crop(percent=(0, crop)), # random crops
            # Small gaussian blur with random sigma between 0 and 0.5.
            # But we only blur about 20% of all images.
            iaa.Sometimes(
                0.2,
                iaa.GaussianBlur(sigma=(0, blur))
            ),
            # Strengthen or weaken the contrast in each image.
            iaa.LinearContrast((1-contrast, 1+contrast)),
            # Add gaussian noise.
            iaa.AdditiveGaussianNoise(loc=0, scale=(0.0, 0.05*255), per_channel=0.5),
            # Apply affine transformations to each image.
            # Scale/zoom them, translate/move them, rotate them and shear them.
            iaa.Affine(
                scale={"x": (1-scale, 1+scale), "y": (1-scale, 1+scale)},
                translate_percent={"x": (-translate, translate), "y": (-translate, translate)},
                rotate=(-rotate, rotate),
                shear=(-shear, shear)
            )
        ], random_order=True) # apply augmenters in random order
        
        rtn = ""
        rtn_json = []

        try:
            for i in range(numImages):
                print("image" + str(i))
                image = data.FILES["image" + str(i)]
                im = imageio.imread(image)
                
                imageio.imwrite(uploadedStorage + str(nameUploaded) + ".png",im)
                nameUploaded+=1
                
                images = np.array([im for _ in range(multiplier)],dtype=np.uint8)
                images_aug = seq(images=images)
                nameFile = int(num_of_files_aug) + 1
                for j in images_aug:
                    imageio.imwrite(storageLoc_aug + str(nameFile) + ".png",j)
                    location = commonStorage + str(className) + "_" + str(nameFile) + ".png"
                    imageio.imwrite(location,j)
                    rtn_json.append({str(image):location})
                    nameFile += 1
                    num_of_files_aug += 1
                rtn += "\n Successfully stored and augmented image " +str(i+1) + "th " + str(multiplier) + " number of times!"
        except:
                rtn = "Error Happened!"        
        return JsonResponse(rtn_json,safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)