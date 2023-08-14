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
# class IssueTokenRequestSerializer(Serializer):
#     model = CustomUser
#
#     username = CharField(required=True)
#     password = CharField(required=True)
#
#
# class TokenSeriazliser(ModelSerializer):
#
#     class Meta:
#         model = Token
#         fields = ['key']


# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#
#         # Add custom claims to the token payload
#         token['role'] = user.role
#
#         return token
#
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


# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'role', 'password']

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


class MachineSerializer(serializers.ModelSerializer):

    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    service_company = serializers.PrimaryKeyRelatedField(queryset=ServiceCompany.objects.all())
    technical_model = serializers.PrimaryKeyRelatedField(queryset=TechnicalModel.objects.all())
    engine_model = serializers.PrimaryKeyRelatedField(queryset=EngineModel.objects.all())
    transmission_model = serializers.PrimaryKeyRelatedField(queryset=TransmissionModel.objects.all())
    driving_bridge_model = serializers.PrimaryKeyRelatedField(queryset=DrivingBridgeModel.objects.all())
    controlled_bridge_model = serializers.PrimaryKeyRelatedField(queryset=ControlledBridgeModel.objects.all())

    # service_company = serializers.StringRelatedField()
    # technical_model = serializers.StringRelatedField()
    # engine_model = serializers.StringRelatedField()
    # transmission_model = serializers.StringRelatedField()
    # driving_bridge_model = serializers.StringRelatedField()
    # controlled_bridge_model = serializers.StringRelatedField()
    # client = serializers.StringRelatedField()

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

        # def to_representation(self, instance):
        #     representation = super().to_representation(instance)
        #     representation['service_company'] = str(instance.service_company)
        #     representation['technical_model'] = str(instance.technical_model)
        #     representation['engine_model'] = str(instance.engine_model)
        #     representation['transmission_model'] = str(instance.transmission_model)
        #     representation['driving_bridge_model'] = str(instance.driving_bridge_model)
        #     representation['controlled_bridge_model'] = str(instance.controlled_bridge_model)
        #     representation['client'] = str(instance.client)
        #     return representation


# class MachineSerializer(serializers.ModelSerializer):
#     technical_model = TechnicalModelSerializer()
#     transmission_model = TransmissionModelSerializer()
#     engine_model = EngineModelSerializer()
#     controlled_bridge_model = ControlledBridgeModelSerializer()
#     driving_bridge_model = DrivingBridgeModelSerializer()
#     service_company = ServiceCompanySerializer()
#
#     class Meta:
#         model = Machine
#         fields = '__all__'
#
#     def create(self, validated_data):
#         technical_model_data = validated_data.pop('technical_model')
#         technical_model = TechnicalModel.objects.create(**technical_model_data)
#
#         transmission_model_data = validated_data.pop('transmission_model')
#         transmission_model = TransmissionModel.objects.create(**transmission_model_data)
#
#         engine_model_data = validated_data.pop('engine_model')
#         engine_model = EngineModel.objects.create(**engine_model_data)
#
#         controlled_bridge_model_data = validated_data.pop('controlled_bridge_model')
#         controlled_bridge_model = ControlledBridgeModel.objects.create(**controlled_bridge_model_data)
#
#         driving_bridge_model_data = validated_data.pop('driving_bridge_model')
#         driving_bridge_model = DrivingBridgeModel.objects.create(**driving_bridge_model_data)
#
#         service_company_data = validated_data.pop('service_company')
#         service_company = ServiceCompany.objects.create(**service_company_data)
#
#         # service_company = ServiceCompany.objects.create(**service_company_data)
#
#         machine = Machine.objects.create(
#             technical_model=technical_model,
#             transmission_model=transmission_model,
#             engine_model=engine_model,
#             controlled_bridge_model=controlled_bridge_model,
#             driving_bridge_model=driving_bridge_model,
#             service_company=service_company,
#             **validated_data
#         )
#         return machine

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



