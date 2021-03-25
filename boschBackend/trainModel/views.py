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
import cv2

@api_view(["POST"])
def trainModel(data, model_id):
    try:
        path = './gtsrb/'
        epochs = int(data.POST.get("epochs"))
        strides = int(data.POST.get("strides"))
        padding = int(data.POST.get("padding"))
        trainRatio = float(data.POST.get("training_percent"))
        testRatio = float(data.POST.get("testing_percent"))
        poolingType = data.POST.get("pooling_type")
        kernelSize = int(data.POST.get("kernel_size"))
        depth = int(data.POST.get("depth"))

        f = open(path+ '/Model_params/' + str(model_id) + '.txt', 'w')
        out_str = str(epochs) + ',' +  str(strides) + ',' +  str(padding) + ',' +  str(trainRatio) + ',' +  str(testRatio) + ',' +  str(poolingType) + ',' +  str(kernelSize) + ',' +  str(depth)
        f.write(out_str)
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

            model.save(path+'/Models/'+str(model_id)+ '.h5')

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

@api_view(['GET'])
def predict(Model_id, Image_path):
    model = tf.keras.load_model('./gtsrb/Models'+str(Model_id))
    img = cv2.imread(Image_path)
    img = np.array(img)
    history = model.predict_classes(img)
    return JsonResponse(history, safe = False)

@api_view(['GET'])
def getModels():
    path = './gtsrb/'
    model_dir = os.listdir(path + 'Models')
    param_dir = os.listdir(path + 'Model_params')
    res = {modelsArray : [] }
    for model_name in model_dir:
        f = open(path + 'Model_params' + model_name, 'r')
        s = f.read;
        vals = s.split(',')
        temp = {  
        modelid: model_name.
        training_percent: vals[0],
        validation_percent: ,
        epochs: 5,
        padding: 1,
        depth: 50,
        pooling_type: “none”,
        kernel_size: 3,
        stride:2,
        training_status: “Completed”,
        training_accuracy: 96.54,
        Validation_accuracy: 93,
        f1_score: 0.8,
        precision: 0.7,
        recall: 0.9,
        epoch _accuracy:[0.46,0.94,0.95,0.96, 0.96]

        }


        

