from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework.authtoken.models import Token
from . import apps
from .models import *
from django.contrib.auth import get_user_model
from rest_framework import serializers


# class UserSerializer(ModelSerializer):
#
#     class Meta:
#         class Meta:
#          model = CustomUser
#          fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']
#
#
class IssueTokenRequestSerializer(Serializer):
    model = CustomUser

    username = CharField(required=True)
    password = CharField(required=True)


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']


User = get_user_model()
ROLES_CHOICES = (
    ('guest', 'Guest'),
    ('client', 'Client'),
    ('service_company', 'Service Company'),
    ('manager', 'Manager'),
)


class UserSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=ROLES_CHOICES)
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'role']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields = '__all__'
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'role']


class ClientSerializer(serializers.ModelSerializer):
    name = CustomUserSerializer()

    class Meta:
        model = Client
        fields = '__all__'


class ServiceCompanySerializer(serializers.ModelSerializer):
    name = CustomUserSerializer()

    class Meta:
        model = ServiceCompany
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


class RecoveryMethodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ['id', 'name', 'description', ]


class TypeOfMaintenanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TypeOfMaintenance
        fields = ['id', 'name', 'description', ]


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'description', ]


class FailureNodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FailureNode
        fields = ['id', 'name', 'description', ]


class MachineSerializer(serializers.ModelSerializer):

    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    service_company = serializers.PrimaryKeyRelatedField(queryset=ServiceCompany.objects.all())
    technical_model = serializers.PrimaryKeyRelatedField(queryset=TechnicalModel.objects.all())
    engine_model = serializers.PrimaryKeyRelatedField(queryset=EngineModel.objects.all())
    transmission_model = serializers.PrimaryKeyRelatedField(queryset=TransmissionModel.objects.all())
    driving_bridge_model = serializers.PrimaryKeyRelatedField(queryset=DrivingBridgeModel.objects.all())
    controlled_bridge_model = serializers.PrimaryKeyRelatedField(queryset=ControlledBridgeModel.objects.all())

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


class MaintenanceSerializer(serializers.ModelSerializer):

    type_of_maintenance = serializers.PrimaryKeyRelatedField(queryset=TypeOfMaintenance.objects.all())
    organization = serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all())
    machine = serializers.PrimaryKeyRelatedField(queryset=Machine.objects.all())

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
                  ]


class ClaimSerializer(serializers.HyperlinkedModelSerializer):

    machine = serializers.PrimaryKeyRelatedField(queryset=Machine.objects.all())
    failure_node = serializers.PrimaryKeyRelatedField(queryset=FailureNode.objects.all())
    recovery_method = serializers.PrimaryKeyRelatedField(queryset=RecoveryMethod.objects.all())
    service_company = serializers.PrimaryKeyRelatedField(queryset=ServiceCompany.objects.all())

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

