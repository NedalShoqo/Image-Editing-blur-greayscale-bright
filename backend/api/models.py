from django.db import models

class UploadedImage(models.Model):
    original_image = models.ImageField(upload_to='originals/')
    filtered_image = models.ImageField(upload_to='filtered/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)