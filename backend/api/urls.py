from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WeddingDetailViewSet, FunctionFolderViewSet, GalleryImageViewSet, ProgramEventViewSet

router = DefaultRouter()
router.register(r'wedding-details', WeddingDetailViewSet)
router.register(r'function-folders', FunctionFolderViewSet)
router.register(r'gallery', GalleryImageViewSet)
router.register(r'programs', ProgramEventViewSet)

urlpatterns = [
    path('', include(router.urls)),
]