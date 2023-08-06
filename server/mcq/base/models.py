from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
import uuid


class Profile(models.Model):
    username = models.CharField(max_length=300, blank=True)
    question1 = models.CharField(max_length=300, blank=True)
    question2 = models.CharField(max_length=300, blank=True)
    question3 = models.CharField(max_length=300, blank=True)
    question4 = models.CharField(max_length=300, blank=True)
    question5 = models.CharField(max_length=300, blank=True)
    scoredata = models.IntegerField(blank=True, default=1)

    created_at = models.CharField(max_length=200, blank=True)
    uuid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, blank=True)


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    choice1 = models.CharField(max_length=50)
    choice2 = models.CharField(max_length=50)
    choice3 = models.CharField(max_length=50)
    choice4 = models.CharField(max_length=50)
    correct_choice = models.CharField(max_length=100)
    refid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, blank=True)

    def __str__(self):
        return self.question_text


class User(AbstractUser):
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
        related_query_name='custom_user',
    )
