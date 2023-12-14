from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=10, unique=True, primary_key=True)
    password = models.CharField(max_length=10)
    coin     = models.IntegerField(default=0)

    def __str__(self):
        return self.username
    
    