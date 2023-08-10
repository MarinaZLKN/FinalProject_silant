from django import forms
from allauth.account.forms import SignupForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomUser

# class CustomUserCreationForm(UserCreationForm):
#
#     class Meta:
#         model = CustomUser
#         fields = ('username', 'email')

#
# class CustomUserChangeForm(UserChangeForm):
#
#     class Meta:
#         model = CustomUser
#         fields = ('username', 'email')


class CustomSignupForm(SignupForm):
    role = forms.ChoiceField(choices=CustomUser.ROLES, label='Role')

    def save(self, request):
        user = super().save(request)
        user.role = self.cleaned_data.get('role')
        user.save()
        return user


class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'role']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        user.username = self.cleaned_data['username']
        user.role = self.cleaned_data['role']
        if commit:
            user.save()
        return user
