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
import tensorflow as tf
from tensorflow.python.keras.applications import resnet
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense
from keras.callbacks import ModelCheckpoint

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

        with tf.device("/gpu:0"):
            model = Sequential();
            model.add(resnet.ResNet50(include_top = False, pooling = 'avg', weights = 'imagenet'))
            model.add(Dense(48, activation = "relu"))
            model.summary()
            model.compile(optimizer=tf.keras.optimizers.SGD(lr=0.005, momentum=0.9),
                loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True, label_smoothing=0.1),
                metrics=['accuracy']
              )


            train_datagen = tf.keras.preprocessing.image.ImageDataGenerator(validation_split = testRatio)
            path = 'gtsrb/'
            train_generator = train_datagen.flow_from_directory(
            path+'Train',
            target_size=(150,150),
            class_mode='categorical',
            batch_size=126,
            subset = 'training'
            )

            validation_generator = train_datagen.flow_from_directory(
                    path+'Train/',
                    target_size = (30, 30),
                    class_mode = 'categorical',
                    batch_size = 126,
                    subset = 'validation'
                    )

            filepath="./weights-improvement-{epoch:02d}-{val_accuracy:.2f}.hdf5"
            checkpoint = ModelCheckpoint(filepath, monitor='val_accuracy', verbose=1, save_best_only=True, mode='max')
            callbacks_list = [checkpoint]
            history = model.fit(
            train_generator,
            steps_per_epoch = 1,
            epochs = 1,
            validation_data = validation_generator
            )

            model.save(path+'/Models/NewModel')
        # print('epochs : ',epochs)
        # print('strides : ',strides)
        # print('padding : ',padding)
        # print('trainRatio : ',trainRatio)
        # print('testRatio : ',testRatio)
        # print('poolingType : ',poolingType)
        # print('kernelSize : ',kernelSize)
        # print('depth : ',depth)
        rtn = "Training initiated"
        return JsonResponse(rtn,safe=False)
    except ValueError as e:
        return Response(e.args[0],status.HTTP_400_BAD_REQUEST)
