from django import forms
from allauth.account.forms import SignupForm
from .models import CustomUser


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
