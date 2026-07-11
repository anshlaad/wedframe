from rest_framework import viewsets
from .models import WeddingDetail, FunctionFolder, GalleryImage, ProgramEvent
from .serializers import WeddingDetailSerializer, FunctionFolderSerializer, GalleryImageSerializer, ProgramEventSerializer

class WeddingDetailViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = WeddingDetail.objects.all()
    serializer_class = WeddingDetailSerializer

class FunctionFolderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FunctionFolder.objects.all()
    serializer_class = FunctionFolderSerializer

class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer

class ProgramEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProgramEvent.objects.all()
    serializer_class = ProgramEventSerializer