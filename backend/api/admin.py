from django.contrib import admin
from .models import WeddingDetail, FunctionFolder, GalleryImage, ProgramEvent, GuestMessage, RSVP

@admin.register(WeddingDetail)
class WeddingDetailAdmin(admin.ModelAdmin):
    list_display = ('groom_name', 'bride_name', 'wedding_date')

@admin.register(FunctionFolder)
class FunctionFolderAdmin(admin.ModelAdmin):
    list_display = ('name', 'drive_link', 'order')
    list_editable = ('order',)

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'alt_text', 'uploaded_at')

@admin.register(ProgramEvent)
class ProgramEventAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_text', 'time_text', 'order')
    list_editable = ('order',)

@admin.register(GuestMessage)
class GuestMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'message', 'created_at')
    search_fields = ('name',)

@admin.register(RSVP)
class RSVPAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'is_attending', 'guests_count', 'submitted_at')
    list_filter = ('is_attending',)
    search_fields = ('name', 'phone')