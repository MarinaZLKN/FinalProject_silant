from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from backend import views
from backend.views import *
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'service_companies', ServiceCompanyViewset)
router.register(r'technical_models', TechnicalModelViewset)
router.register(r'transmission_models', TransmissionModelViewset)
router.register(r'engine_models', EngineModelViewset)
router.register(r'driving_bridge_models', DrivingBridgeModelViewset)
router.register(r'controlled_bridge_models', ControlledBridgeModelViewset)
router.register(r'types_of_maintenance', TypeOfMaintenanceViewset)
router.register(r'recovery_methods', RecoveryMethodViewset)
router.register(r'machines', MachineViewset)
router.register(r'maintenances', MaintenanceViewset)
router.register(r'claim', ClaimViewset)
router.register(r'clients', ClientViewset)
router.register(r'organizations', OrganizationViewset)
router.register(r'failure_nodes', FailureNodeViewset)
router.register(r'users', CustomUserList)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('backend.urls')),
    path('front/', include('frontend.urls')),
    path('api/', include(router.urls)),
    path('api/machines/<int:machine_id>/', views.machine_detail, name='machine-detail'),
    # path('api/machines/', views.create_machine),
    path('machines/create/', MachineCreateView.as_view(), name='machine-create'),
    # path('api/user', views.user, name='user'),
    # path('api/login', views.issue_token, name='issue_token'),
    # path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    # path('login/', login_view, name='login'),
    path('api-auth/', include('rest_framework.urls')),
    path('accounts/', include('allauth.urls')),
    # path('accounts/register/', register_user, name='register_user'),
    # path('api/register/', UserRegistrationView.as_view(), name='user_registration_drf'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
