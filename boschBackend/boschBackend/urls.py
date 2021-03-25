"""boschBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from augmentation import views as aug_views
from trainModel import views as train_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('addImages/',aug_views.ImageAug),
    path('trainModel/',train_view.trainModel),
    path('getPrediction/', train_view.predict),
    path('getModels/', train_view.getModels)
]
