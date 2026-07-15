from rest_framework import serializers
from .models import WeddingDetail, FunctionFolder, GalleryImage, ProgramEvent, GuestMessage, RSVP

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

class GuestMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuestMessage
        fields = '__all__'

class RSVPSerializer(serializers.ModelSerializer):
    class Meta:
        model = RSVP
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