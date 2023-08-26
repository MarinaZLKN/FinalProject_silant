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
router.register(r'machines', MachineViewset, basename='machine')
router.register(r'maintenances', MaintenanceViewset, basename='maintenance')
router.register(r'claim', ClaimViewset, basename='claim')
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
    path('api/machines/', views.create_machine, name='create_machine'),
    path('api/maintenances/', views.create_maintenance, name='create_maintenance'),
    path('api/claims/', views.create_claim, name='create_claim'),
    path('api/user', user, name='user'),
    path('api/login', issue_token, name='issue_token'),
    path('api/logout', UserLogout.as_view(), name='logout'),
    path('api/permissions/', views.get_user_permissions, name='get_user_permissions'),
    path('api-auth/', include('rest_framework.urls')),
    path('accounts/', include('allauth.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
