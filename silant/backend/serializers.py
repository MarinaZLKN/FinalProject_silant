from rest_framework import serializers
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']


class GuestSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Guest
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Client
        fields = '__all__'


class ServiceCompanySerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = ServiceCompany
        fields = '__all__'


class ManagerSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Manager
        fields = '__all__'


class TechnicalModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TechnicalModel
        fields = ['id', 'name', 'description', ]


class EngineModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EngineModel
        fields = ['id', 'name', 'description', ]


class TransmissionModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = ['id', 'name', 'description', ]


class ControlledBridgeModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ControlledBridgeModel
        fields = ['id', 'name', 'description', ]


class DrivingBridgeModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DrivingBridgeModel
        fields = ['id', 'name', 'description', ]


class TypeOfMaintenanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TypeOfMaintenance
        fields = ['id', 'name', 'description', ]


class RecoveryMethodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ['id', 'name', 'description', ]


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'description', ]


class FailureNodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FailureNode
        fields = ['id', 'name', 'description', ]


class MachineSerializer(serializers.HyperlinkedModelSerializer):
    service_company = serializers.StringRelatedField()
    technical_model = serializers.StringRelatedField()
    engine_model = serializers.StringRelatedField()
    transmission_model = serializers.StringRelatedField()
    driving_bridge_model = serializers.StringRelatedField()
    controlled_bridge_model = serializers.StringRelatedField()
    client = serializers.StringRelatedField()

    class Meta:
        model = Machine
        fields = ['id',
                  'machine_factory_number',
                  'engine_factory_number',
                  'transmission_factory_number',
                  'driving_bridge_factory_number',
                  'controlled_bridge_factory_number',
                  'delivery_contract',
                  'shipment_date',
                  'consignee',
                  'delivery_address',
                  'equipment',
                  'client',
                  'service_company',
                  'technical_model',
                  'engine_model',
                  'transmission_model',
                  'driving_bridge_model',
                  'controlled_bridge_model',
                  ]


class MaintenanceSerializer(serializers.HyperlinkedModelSerializer):
    type_of_maintenance = serializers.StringRelatedField()
    organization = serializers.StringRelatedField()
    machine = serializers.StringRelatedField()
    service_company = serializers.StringRelatedField()

    class Meta:
        model = Maintenance
        fields = ['id',
                  'date_of_maintenance',
                  'operating_time',
                  'order_number',
                  'data_of_order',
                  'organization',
                  'type_of_maintenance',
                  'machine',
                  'service_company',
                  ]


class ClaimSerializer(serializers.HyperlinkedModelSerializer):
    recovery_method = serializers.StringRelatedField()
    failure_node = serializers.StringRelatedField()
    description_of_failure = serializers.StringRelatedField()
    machine = serializers.StringRelatedField()
    service_company = serializers.StringRelatedField()

    class Meta:
        model = Claim
        fields = ['id',
                  'date_of_failure',
                  'operating_time',
                  'failure_node',
                  'spare_parts_used',
                  'date_of_recovery',
                  'technical_downtime',
                  'recovery_method',
                  'description_of_failure',
                  'machine',
                  'service_company',
                  ]
