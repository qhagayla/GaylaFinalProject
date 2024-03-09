from django.db import models
from django.utils import timezone

class Video(models.Model):
    caption = models.CharField(max_length=100)
    video = models.FileField(upload_to="videos/%Y/%m/%d")  # %Y will create subdirectories based on the year, %m for month, and %d for day
    upload_date = models.DateTimeField(default=timezone.now)  # Add default value here