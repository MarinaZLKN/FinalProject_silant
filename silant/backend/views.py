import django_filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.request import Request
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from .serializers import *
from .models import *
from allauth.account.views import SignupView
from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import render, redirect
from django_filters import rest_framework as filters
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def issue_token(request: Request):
#     serializer = IssueTokenRequestSerializer(data=request.data)
#     if serializer.is_valid():
#         authenticated_user = authenticate(**serializer.validated_data)
#         try:
#             token = Token.objects.get(user=authenticated_user)
#         except Token.DoesNotExist:
#             token = Token.objects.create(user=authenticated_user)
#         return Response(TokenSeriazliser(token).data)
#     else:
#         return Response(serializer.errors, status=400)
#
#
# @api_view()
# @permission_classes([IsAuthenticated])
# @authentication_classes([TokenAuthentication])
# def user(request: Request):
#     return Response({
#         'data': UserSerializer(request.user).data
#     })


# def register_user(request):
#     if request.method == 'POST':
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             return redirect('/')
#     else:
#         form = UserRegistrationForm()
#
#     return render(request, 'accounts/register.html', {'form': form})
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


# def login_view(request):
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Успешный вход!'})
#         else:
#             return JsonResponse({'message': 'Неверное имя или пароль!'}, status=401)
#
#     return JsonResponse({'message': 'Invalid reguest'}, status=400)


class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserSerializer


# class CustomSignupView(SignupView):
#     form_class = CustomSignupForm
#     template_name = 'accounts/signup.html'


def main(request):
    return render(request, 'base.html')


class CustomUserList(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class ClientList(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


# class ServiceCompanyList(viewsets.ModelViewSet):
#     queryset = ServiceCompany.objects.all()
#     serializer_class = ServiceCompanySerializer


# class ManagerList(viewsets.ModelViewSet):
#     queryset = Manager.objects.all()
#     serializer_class = ManagerSerializer


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
    #serializer_class = ClientSerializer
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


class MachineFilterView(generics.ListAPIView):
    serializer_class = MachineSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['technical_model__name', 'engine_model__name', 'transmission_model__name', 'controlled_bridge_model__name', 'driving_bridge_model__name']

    def get_queryset(self):
        queryset = Machine.objects.all()

        technical_model = self.request.query_params.get('technical_model', None)
        engine_model = self.request.query_params.get('engine_model', None)
        transmission_model = self.request.query_params.get('transmission_model', None)
        controlled_bridge_model = self.request.query_params.get('controlled_bridge_model', None)
        driving_bridge_model = self.request.query_params.get('driving_bridge_model', None)

        if technical_model:
            queryset = queryset.filter(technical_model__name=technical_model)

        if engine_model:
            queryset = queryset.filter(engine_model__name=engine_model)

        if transmission_model:
            queryset = queryset.filter(transmission_model__name=transmission_model)

        if controlled_bridge_model:
            queryset = queryset.filter(controlled_bridge_model__name=controlled_bridge_model)

        if driving_bridge_model:
            queryset = queryset.filter(driving_bridge_model__name=driving_bridge_model)

        return queryset


class MachineViewset(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    # filterset_class = MachineFilterView
    ordering_fields = ["-shipment_date"]
    ordering = ["-shipment_date"]


class MaintenanceViewset(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    ordering_fields = ['-date_of_maintenance']
    ordering = ['-date_of_maintenance']


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


class ClaimFilterView(generics.ListAPIView):
    serializer_class = ClaimSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['service_company__name', 'failure_node__name', 'recovery_method__name']

    def get_queryset(self):
        queryset = Claim.objects.all()

        service_company = self.request.query_params.get('service_company', None)
        failure_node = self.request.query_params.get('failure_node', None)
        recovery_method = self.request.query_params.get('recovery_method', None)

        if service_company:
            queryset = queryset.filter(service_company__name=service_company)

        if failure_node:
            queryset = queryset.filter(failure_node__name=failure_node)

        if recovery_method:
            queryset = queryset.filter(recovery_method__name=recovery_method)

        return queryset


class ClaimViewset(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    ordering_fields = ['-date_of_failure']
    ordering = ['-date_of_failure']


@api_view(['GET'])
def machine_detail(request, machine_id):
    try:
        machine = Machine.objects.get(id=machine_id)
        serializer = MachineSerializer(machine)
        return Response(serializer.data)
    except Machine.DoesNotExist:
        return Response({'detail': 'Machine not found'}, status=404)


@api_view(['GET'])
def claim_detail(request, claim_id):
    try:
        claim = Claim.objects.get(id=claim_id)
        serializer = ClaimSerializer(claim)
        return Response(serializer.data)
    except Claim.DoesNotExist:
        return Response({'detail': 'Claim not found'}, status=404)


@api_view(['GET'])
def maintenance_detail(request, maintenance_id):
    try:
        maintenance = Maintenance.objects.get(id=maintenance_id)
        serializer = MaintenanceSerializer(maintenance)
        return Response(serializer.data)
    except Maintenance.DoesNotExist:
        return Response({'detail': 'Maintenance not found'}, status=404)


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


@api_view(['POST'])
def create_machine(request):
    if request.method == 'POST':
        serializer = MachineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)