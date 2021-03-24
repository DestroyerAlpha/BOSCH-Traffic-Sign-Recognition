from django.db import models

# Create your models here.
class TrafficSignClasses(models.Model):
    className = models.TextField()
    classImgSrc = models.TextField()
    classImgCount = models.IntegerField()
    classAugLinks = models.JSONField()
