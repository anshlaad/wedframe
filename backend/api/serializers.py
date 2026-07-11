from rest_framework import serializers
from .models import WeddingDetail, FunctionFolder, GalleryImage, ProgramEvent

class WeddingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeddingDetail
        fields = '__all__'

class FunctionFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FunctionFolder
        fields = '__all__'

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'

class ProgramEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramEvent
        fields = '__all__'