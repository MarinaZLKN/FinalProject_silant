import django_filters
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from .serializers import *
from .models import *
from allauth.account.views import SignupView
from .forms import CustomSignupForm
from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm
from django_filters import rest_framework as filters
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView


def register_user(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('/')
    else:
        form = UserRegistrationForm()

    return render(request, 'accounts/register.html', {'form': form})
#
#
# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = CustomTokenObtainPairSerializer
#
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         refresh_token = response.data.get('refresh')
#         access_token = response.data.get('access')
#         if refresh_token and access_token:
#             response.data['refresh_token'] = refresh_token
#             response.data['access_token'] = access_token
#             response.data['user'] = {
#                 'id': self.request.user.id,
#                 'username': self.request.user.username,
#                 'role': self.request.user.role,
#             }
#         return response
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Успешный вход!'})
        else:
            return JsonResponse({'message': 'Неверное имя или пароль!'}, status=401)

    return JsonResponse({'message': 'Invalid reguest'}, status=400)


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer


class CustomSignupView(SignupView):
    form_class = CustomSignupForm
    template_name = 'accounts/signup.html'


def main(request):
    return render(request, 'base.html')


class CustomUserList(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class ClientList(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class ServiceCompanyList(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer


class ManagerList(viewsets.ModelViewSet):
    queryset = Manager.objects.all()
    serializer_class = ManagerSerializer


class ServiceCompanyViewset(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class TechnicalModelViewset(viewsets.ModelViewSet):
    queryset = TechnicalModel.objects.all()
    serializer_class = TechnicalModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class TransmissionModelViewset(viewsets.ModelViewSet):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ["name"]


class EngineModelViewset(viewsets.ModelViewSet):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class DrivingBridgeModelViewset(viewsets.ModelViewSet):
    queryset = DrivingBridgeModel.objects.all()
    serializer_class = DrivingBridgeModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class ControlledBridgeModelViewset(viewsets.ModelViewSet):
    queryset = ControlledBridgeModel.objects.all()
    serializer_class = ControlledBridgeModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class TypeOfMaintenanceViewset(viewsets.ModelViewSet):
    queryset = TypeOfMaintenance.objects.all()
    serializer_class = TypeOfMaintenanceSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class RecoveryMethodViewset(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    serializer_class = ClientSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class ClientViewset(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class OrganizationViewset(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class FailureNodeViewset(viewsets.ModelViewSet):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class MachineFilter(filters.FilterSet):
    class Meta:
        model = Machine
        fields = {
            'technical_model__name': ['exact'],
            'engine_model__name': ['exact'],
            'transmission_model__name': ['exact'],
            'controlled_bridge_model__name': ['exact'],
            'driving_bridge_model__name': ['exact'],
            'machine_factory_number': ['exact', 'contains'],

        }


class MachineViewset(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    filterset_class = MachineFilter
    ordering_fields = ["-shipment_date"]
    ordering = ["-shipment_date"]
    # filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = [
    #     "machine_factory_number",
    #     "technical_model",
    #     "engine_model",
    #     "transmission_model",
    #     "driving_bridge_model",
    #     "controlled_bridge_model",
    #     "client",
    #     "service_company"
    # ]


class MaintenanceViewset(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    ordering_fields = ['-date_of_maintenance']
    ordering = ['-date_of_maintenance']
    # filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ["type_of_maintenance", "machine", "service_company"]


class MaintenanceFilterView(generics.ListAPIView):
    serializer_class = MaintenanceSerializer
    filter_backends = [SearchFilter]
    search_fields = ['machine__machine_factory_number', 'type_of_maintenance__name', 'service_company__name']

    def get_queryset(self):
        queryset = Maintenance.objects.all()
        machine_factory_number = self.request.query_params.get('machine_factory_number', None)
        type_of_maintenance = self.request.query_params.get('type_of_maintenance', None)
        service_company = self.request.query_params.get('service_company', None)

        if machine_factory_number:
            queryset = queryset.filter(machine__machine_factory_number=machine_factory_number)

        if type_of_maintenance:
            queryset = queryset.filter(type_of_maintenance__name=type_of_maintenance)

        if service_company:
            queryset = queryset.filter(service_company__name=service_company)

        return queryset

class ClaimViewset(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    ordering_fields = ['-date_of_failure']
    ordering = ['-date_of_failure']
    # filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    # filterset_fields = ["failure_node", "recovery_method", "service_company"]


@api_view(['GET'])
def machine_detail(request, machine_id):
    try:
        machine = Machine.objects.get(id=machine_id)
        serializer = MachineSerializer(machine)
        return Response(serializer.data)
    except Machine.DoesNotExist:
        return Response({'detail': 'Machine not found'}, status=404)


@api_view(['GET', 'POST'])
def machine_list(request):
    if request.method == 'GET':
        machines = Machine.objects.all()
        serializer = MachineSerializer(machines, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MachineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
# def machine_detail(request, machine_id):
#     try:
#         machine = Machine.objects.get(id=machine_id)
#     except Machine.DoesNotExist:
#         return Response({'detail': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
#
#     if request.method == 'GET':
#         serializer = MachineSerializer(machine)
#         return Response(serializer.data)
#     elif request.method in ['PUT', 'PATCH']:
#         serializer = MachineSerializer(machine, data=request.data, partial=request.method == 'PATCH')
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         machine.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
