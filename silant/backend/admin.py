from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
# from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import *
from django.utils.translation import gettext_lazy as _


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', "first_name", "role", 'is_staff', 'is_superuser', 'date_joined', ]

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "role",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'first_name', 'last_name', 'email', 'role', 'is_staff',
                       'is_superuser', 'date_joined'),
        }),
    )


admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Machine)
admin.site.register(TechnicalModel)
admin.site.register(EngineModel)
admin.site.register(ControlledBridgeModel)
admin.site.register(Maintenance)
admin.site.register(TypeOfMaintenance)
admin.site.register(RecoveryMethod)
admin.site.register(TransmissionModel)
admin.site.register(DrivingBridgeModel)
admin.site.register(Organization)
admin.site.register(FailureNode)
admin.site.register(Claim)
admin.site.register(Client)
admin.site.register(ServiceCompany)


