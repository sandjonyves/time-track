from django.db import models
from django.utils import timezone
from apps.accounts.models import CustomUser


class Task(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now)
    end_time = models.DateTimeField()
    duration = models.DurationField(blank=True, null=True)  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)       

    def save(self, *args, **kwargs):
      
        if self.start_time and self.end_time:
            self.duration = self.end_time - self.start_time
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.description} ({self.start_time.date()})"