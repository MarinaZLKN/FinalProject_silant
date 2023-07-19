from django.contrib.auth.backends import ModelBackend

from backend.models import CustomUser


class CustomUserBackend(ModelBackend):
    def get_user(self, user_id):
        try:
            return CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return None