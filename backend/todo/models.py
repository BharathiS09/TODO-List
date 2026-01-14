from django.db import models

# Create your models here.

class Todo(models.Model):
    title=models.charField(max_length=200)
    completed=models.BooleanField(default=False)