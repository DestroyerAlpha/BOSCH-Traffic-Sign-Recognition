from rest_framework import serializers
from backend.models import TrafficSignClasses

class TrafficSignSignalSerializer(serializers.HyperlinkedModelSerializer):
    classID = serializers.IntegerField(source='id')
    class Meta:
        model = TrafficSignClasses
        fields = ['classID', 'className', 'classImgSrc', 'classImgCount', 'classAugLinks']
