
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from backend.views import *

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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('backend.urls')),
    path('api/', include(router.urls)),
]
