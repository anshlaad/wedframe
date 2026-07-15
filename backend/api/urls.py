from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RSVPViewSet, WeddingDetailViewSet, FunctionFolderViewSet, GalleryImageViewSet, ProgramEventViewSet, GuestMessageViewSet

router = DefaultRouter()
router.register(r'wedding-details', WeddingDetailViewSet)
router.register(r'function-folders', FunctionFolderViewSet)
router.register(r'gallery', GalleryImageViewSet)
router.register(r'programs', ProgramEventViewSet)
router.register(r'guest-messages', GuestMessageViewSet)
router.register(r'rsvp', RSVPViewSet)

urlpatterns = [
    path('', include(router.urls)),
]