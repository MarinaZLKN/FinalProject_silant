from django.contrib import admin

from .models import *

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

