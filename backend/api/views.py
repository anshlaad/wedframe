from rest_framework import viewsets
from .models import WeddingDetail, FunctionFolder, GalleryImage, ProgramEvent, GuestMessage, RSVP
from .serializers import WeddingDetailSerializer, FunctionFolderSerializer, GalleryImageSerializer, ProgramEventSerializer, GuestMessageSerializer, RSVPSerializer

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

class GuestMessageViewSet(viewsets.ModelViewSet):
    queryset = GuestMessage.objects.all()
    serializer_class = GuestMessageSerializer

class RSVPViewSet(viewsets.ModelViewSet):
    queryset = RSVP.objects.all()
    serializer_class = RSVPSerializer