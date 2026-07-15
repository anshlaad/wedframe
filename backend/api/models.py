from django.db import models

# 1. Main Wedding Details (Countdown, Hero names, Master Drive Link)
class WeddingDetail(models.Model):
    groom_name = models.CharField(max_length=50, default="Ansh")
    bride_name = models.CharField(max_length=50)
    wedding_date = models.DateTimeField(help_text="Format: YYYY-MM-DD HH:MM:SS")
    city = models.CharField(max_length=50, default="Bhopal", help_text="e.g. Bhopal, Indore")
    master_drive_link = models.URLField(blank=True, null=True)
    
    # 🌟 NEW: Venue & Contact Info
    venue_name = models.CharField(max_length=100, default="Lotus City")
    venue_address = models.TextField(help_text="Complete address with Pincode")
    map_embed_url = models.URLField(max_length=1000, blank=True, null=True, help_text="Google Maps Embed SRC link")
    
    contact_1_name = models.CharField(max_length=50, default="Family Member 1")
    contact_1_phone = models.CharField(max_length=20, default="+91 98765 43210")
    
    contact_2_name = models.CharField(max_length=50, default="Family Member 2", blank=True, null=True)
    contact_2_phone = models.CharField(max_length=20, default="+91 98765 43211", blank=True, null=True)

    def __str__(self):
        return f"{self.groom_name} & {self.bride_name} Wedding"

# 2. Function Folders (Haldi, Sangeet drive links)
class FunctionFolder(models.Model):
    name = models.CharField(max_length=100)
    drive_link = models.URLField()
    image = models.ImageField(upload_to='functions/')
    order = models.IntegerField(default=0, help_text="Order in which it appears on website")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

# 3. Swipe Gallery Images
class GalleryImage(models.Model):
    image = models.ImageField(upload_to='gallery/')
    alt_text = models.CharField(max_length=100, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return self.alt_text or f"Gallery Image {self.id}"

# 4. Program Details (Cards)
class ProgramEvent(models.Model):
    name = models.CharField(max_length=100)
    date_text = models.CharField(max_length=50, help_text="e.g. 9th Dec 2026")
    time_text = models.CharField(max_length=50, help_text="e.g. 10:00 AM Onwards")
    dress_code = models.CharField(max_length=100)
    image = models.ImageField(upload_to='programs/')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name
    
# 5. Guestbook / Digital Wishes
class GuestMessage(models.Model):
    name = models.CharField(max_length=100)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at'] # Naye messages sabse upar dikhenge

    def __str__(self):
        return f"Wish from {self.name}"

# 6. Dynamic RSVP System
class RSVP(models.Model):
    ATTENDANCE_CHOICES = [
        ('Yes', 'Yes, I will attend'),
        ('No', 'Sorry, I cannot attend'),
    ]
    
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    is_attending = models.CharField(max_length=10, choices=ATTENDANCE_CHOICES, default='Yes')
    guests_count = models.PositiveIntegerField(default=1, help_text="Kitne log aa rahe hain?")
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.name} - {self.is_attending} ({self.guests_count} Guests)"