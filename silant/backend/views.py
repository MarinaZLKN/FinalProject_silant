import django_filters
from django.http import JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.request import Request
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .filters import MachineFilter, MaintenanceFilter, ClaimFilter
from .serializers import *
from .models import *
from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, logout


@api_view(['POST'])
@permission_classes([AllowAny])
def issue_token(request: Request):
    serializer = IssueTokenRequestSerializer(data=request.data)
    if request.user.is_authenticated:
        print("User is logged in!")
    else:
        print("User is not logged in!")
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        print(f"Authenticated User: {authenticated_user}")

        # Checking if authenticate returned a valid user
        if authenticated_user is None:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=authenticated_user)
        return Response(TokenSerializer(token).data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def user(request: Request):
    if request.user.is_authenticated:
        print("User is logged in!")
    else:
        print("User is not logged in!")
    return Response({
        'data': UserSerializer(request.user).data
    })


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        print("User  is logged out!")
        logout(request)
        return Response(status=status.HTTP_200_OK)

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


# Serializer for Machine/Maintenance/Claim instance filtration

class MachineFilterView(generics.ListAPIView):
    serializer_class = MachineSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MachineFilter

    def get_queryset(self):
        return Machine.objects.all()


class MaintenanceFilterView(generics.ListAPIView):
    serializer_class = MaintenanceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = MaintenanceFilter

    def get_queryset(self):
        return Maintenance.objects.all()


class ClaimFilterView(generics.ListAPIView):
    serializer_class = ClaimSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ClaimFilter

    def get_queryset(self):
        return Claim.objects.all()


# Machine/Maintenance/Claim instance ViewSets
class MachineViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = MachineSerializer
    ordering_fields = ["-shipment_date"]
    ordering = ["-shipment_date"]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == CustomUser.MANAGER:
                return Machine.objects.all().order_by('-shipment_date')
            elif user.role == CustomUser.CLIENT:
                try:
                    client = get_object_or_404(Client, name=user)
                    return Machine.objects.filter(client=client).order_by('-shipment_date')
                except Client.DoesNotExist:
                    return Machine.objects.none()
            elif user.role == CustomUser.SERVICE:
                service_company = get_object_or_404(ServiceCompany, name=user)
                return Machine.objects.filter(service_company=service_company).order_by('-shipment_date')
        else:
            return Machine.objects.all()


class MaintenanceViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = MaintenanceSerializer
    ordering_fields = ['date_of_maintenance']
    ordering = ['date_of_maintenance']

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == CustomUser.MANAGER:
                return Maintenance.objects.all().order_by('-date_of_maintenance')
            elif user.role == CustomUser.CLIENT:
                try:
                    client = get_object_or_404(Client, name=user)
                    machine_ids = Machine.objects.filter(client=client).values_list('id', flat=True)
                    return Maintenance.objects.filter(machine__id__in=machine_ids).order_by('-date_of_maintenance')
                except Client.DoesNotExist:
                    return Maintenance.objects.none()
            elif user.role == CustomUser.SERVICE:
                service_company = get_object_or_404(ServiceCompany, name=user)
                machine_ids = Machine.objects.filter(service_company=service_company).values_list('id', flat=True)
                return Maintenance.objects.filter(machine__id__in=machine_ids).order_by('-date_of_maintenance')
        else:
            return Maintenance.objects.none()


class ClaimViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ClaimSerializer
    ordering_fields = ['date_of_failure']
    ordering = ['date_of_failure']

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == CustomUser.MANAGER:
                return Claim.objects.all().order_by('-date_of_failure')
            elif user.role == CustomUser.CLIENT:
                try:
                    client = get_object_or_404(Client, name=user)
                    machines = Machine.objects.filter(client=client)
                    return Claim.objects.filter(machine__in=machines).order_by('date_of_failure')
                except Client.DoesNotExist:
                    return Claim.objects.none()
            elif user.role == CustomUser.SERVICE:
                service_company = get_object_or_404(ServiceCompany, name=user)
                return Claim.objects.filter(service_company=service_company).order_by('date_of_failure')
        else:
            return Claim.objects.none()


# Machine instance detail view
@api_view(['GET', 'PUT', 'DELETE'])
def machine_detail(request, machine_id):
    try:
        machine = Machine.objects.get(id=machine_id)
        technical_model = TechnicalModel.objects.get(id=machine)
        engine_model = EngineModel.objects.get(id=machine)
        transmission_model = TransmissionModel.objects.get(id=machine)
        controlled_bridge_model = ControlledBridgeModel.objects.get(id=machine)
        driving_bridge_model = DrivingBridgeModel.objects.get(id=machine)
        service_company = ServiceCompany.objects.get(id=machine)
        client = Client.objects.get(id=machine)

        if request.method == 'GET':
            machine_serializer = MachineSerializer(machine)
            technical_model_serializer = TechnicalModelSerializer(technical_model)
            engine_model_serializer = EngineModelSerializer(engine_model)
            transmission_model_serializer = TransmissionModelSerializer(transmission_model)
            controlled_bridge_model_serializer = ControlledBridgeModelSerializer(controlled_bridge_model)
            driving_bridge_serializer = DrivingBridgeModelSerializer(driving_bridge_model)
            service_company_serializer = ServiceCompanySerializer(service_company)
            client_serializer = ClientSerializer(client)

            combined_data = {
                'machine': machine_serializer.data,
                'technical_model': {
                    'name': technical_model_serializer.data.get('name', ''),
                    'description': technical_model_serializer.data.get('description', '')
                },
                'engine_model': {
                    'name': engine_model_serializer.data.get('name', ''),
                    'description': engine_model_serializer.data.get('description', '')
                },
                'transmission_model': {
                    'name': transmission_model_serializer.data.get('name', ''),
                    'description': transmission_model_serializer.data.get('description', '')
                },
                'controlled_bridge_model': {
                    'name': controlled_bridge_model_serializer.data.get('name', ''),
                    'description': controlled_bridge_model_serializer.data.get('description', '')
                },
                'driving_bridge_model': {
                    'name': driving_bridge_serializer.data.get('name', ''),
                    'description': driving_bridge_serializer.data.get('description', '')
                },
                'service_company': {
                    'name': service_company_serializer.data.get('name', {}).get('first_name', ''),
                    'description': service_company_serializer.data.get('description', '')
                },
                'client': {
                    'name': client_serializer.data.get('name', {}).get('first_name', ''),
                    'description': client_serializer.data.get('description', '')
                }
            }
            return Response(combined_data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            machine_serializer = MachineSerializer(machine, data=request.data)
            if machine_serializer.is_valid():
                machine_serializer.save()
                return Response(machine_serializer.data, status=status.HTTP_200_OK)
            return Response(machine_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            machine.delete()
            return Response({'detail': 'Claim deleted'}, status=status.HTTP_204_NO_CONTENT)

    except Machine.DoesNotExist:
        return Response({'detail': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
    except TechnicalModel.DoesNotExist:
        return Response({'detail': 'Technical Model not found'}, status=status.HTTP_404_NOT_FOUND)
    except EngineModel.DoesNotExist:
        return Response({'detail': 'Engine Model not found'}, status=status.HTTP_404_NOT_FOUND)
    except TransmissionModel.DoesNotExist:
        return Response({'detail': 'Transmission Model not found'}, status=status.HTTP_404_NOT_FOUND)
    except ControlledBridgeModel.DoesNotExist:
        return Response({'detail': 'Controlled Bridge Model not found'}, status=status.HTTP_404_NOT_FOUND)
    except DrivingBridgeModel.DoesNotExist:
        return Response({'detail': 'Driving Bridge Model not found'}, status=status.HTTP_404_NOT_FOUND)
    except ServiceCompany.DoesNotExist:
        return Response({'detail': 'Service Company not found'}, status=status.HTTP_404_NOT_FOUND)
    except Client.DoesNotExist:
        return Response({'detail': 'Client not found'}, status=status.HTTP_404_NOT_FOUND)


# Claim instance detail view
@api_view(['GET', 'PUT', 'DELETE'])
def claim_detail(request, claim_id):
    try:
        claim = Claim.objects.get(id=claim_id)
        failure_node = FailureNode.objects.get(id=claim_id)
        recovery_method = RecoveryMethod.objects.get(id=claim.id)
        machine = Machine.objects.get(id=claim.machine_id)
        service_company = ServiceCompany.objects.get(id=claim.service_company_id)

        if request.method == 'GET':
            claim_serializer = ClaimSerializer(claim)
            failure_node_serializer = FailureNodeSerializer(failure_node)
            recovery_method_serializer = RecoveryMethodSerializer(recovery_method)
            machine_serializer = MachineSerializer(machine)
            service_company_serializer = ServiceCompanySerializer(service_company)

            combined_data = {
                'claim': claim_serializer.data,
                'failure_node': {
                    'name': failure_node_serializer.data.get('name', ''),
                    'description': failure_node_serializer.data.get('description', '')
                },
                'recovery_method': {
                    'name': recovery_method_serializer.data.get('name', ''),
                    'description': recovery_method_serializer.data.get('description', '')
                },
                'machine': {
                    'name': machine_serializer.data.get('name', ''),
                    'description': machine_serializer.data.get('description', '')
                },
                'service_company': {
                    'name': service_company_serializer.data.get('name', {}).get('first_name', ''),
                    'description': service_company_serializer.data.get('description', '')
                }
            }
            return Response(combined_data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            claim_serializer = ClaimSerializer(claim, data=request.data)
            if claim_serializer.is_valid():
                claim_serializer.save()
                return Response(claim_serializer.data, status=status.HTTP_200_OK)
            return Response(claim_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            claim.delete()
            return Response({'detail': 'Claim deleted'}, status=status.HTTP_204_NO_CONTENT)

    except Claim.DoesNotExist:
        return Response({'detail': 'Claim not found'}, status=status.HTTP_404_NOT_FOUND)
    except FailureNode.DoesNotExist:
        return Response({'detail': 'Failure Node not found'}, status=status.HTTP_404_NOT_FOUND)
    except RecoveryMethod.DoesNotExist:
        return Response({'detail': 'Recovery Method not found'}, status=status.HTTP_404_NOT_FOUND)
    except Machine.DoesNotExist:
        return Response({'detail': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)
    except ServiceCompany.DoesNotExist:
        return Response({'detail': 'Service Company not found'}, status=status.HTTP_404_NOT_FOUND)


# Maintenance instance detail view
@api_view(['GET', 'PUT', 'DELETE'])
def maintenance_detail(request, maintenance_id):
    try:
        maintenance = Maintenance.objects.get(id=maintenance_id)
        # Get related data
        organization = Organization.objects.get(id=maintenance.organization_id)
        type_of_maintenance = TypeOfMaintenance.objects.get(id=maintenance.type_of_maintenance_id)
        machine = Machine.objects.get(id=maintenance.machine_id)

        if request.method == 'GET':
            # Serialize individual parts
            maintenance_serializer = MaintenanceSerializer(maintenance)
            organization_serializer = OrganizationSerializer(organization)
            type_of_maintenance_serializer = TypeOfMaintenanceSerializer(type_of_maintenance)
            machine_serializer = MachineSerializer(machine)

            # Combine data
            combined_data = {
                'maintenance': maintenance_serializer.data,
                'organization': {
                    'name': organization_serializer.data.get('name', ''),
                    'description': organization_serializer.data.get('description', '')
                },
                'type_of_maintenance': {
                    'name': type_of_maintenance_serializer.data.get('name', ''),
                    'description': type_of_maintenance_serializer.data.get('description', '')
                },
                'machine': {
                    'name': machine_serializer.data.get('name', ''),
                    'description': machine_serializer.data.get('description', '')
                },
            }

            return Response(combined_data, status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            maintenance_serializer = ClaimSerializer(maintenance, data=request.data)
            if maintenance_serializer.is_valid():
                maintenance_serializer.save()
                return Response(maintenance_serializer.data, status=status.HTTP_200_OK)
            return Response(maintenance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            maintenance.delete()
            return Response({'detail': 'Claim deleted'}, status=status.HTTP_204_NO_CONTENT)

    except Maintenance.DoesNotExist:
        return Response({'detail': 'Maintenance not found'}, status=status.HTTP_404_NOT_FOUND)
    except Organization.DoesNotExist:
        return Response({'detail': 'Organization not found'}, status=status.HTTP_404_NOT_FOUND)
    except TypeOfMaintenance.DoesNotExist:
        return Response({'detail': 'Type of Maintenance not found'}, status=status.HTTP_404_NOT_FOUND)
    except Machine.DoesNotExist:
        return Response({'detail': 'Machine not found'}, status=status.HTTP_404_NOT_FOUND)


# Machine instance list
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_permissions(request):
    permissions = [f"{perm.content_type.app_label}.{perm.codename}" for perm in request.user.user_permissions.all()]
    for group in request.user.groups.all():
        for perm in group.permissions.all():
            permissions.append(f"{perm.content_type.app_label}.{perm.codename}")

    permissions = list(set(permissions))
    return JsonResponse({"permissions": permissions})


# Machine&Maintenance&Claim instance creation
@api_view(['POST'])
def create_machine(request):
    if request.method == 'POST':
        serializer = MachineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        print('Request data: ', request.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_maintenance(request):
    if request.method == 'POST':
        serializer = MaintenanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        print('Request data: ', request.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_claim(request):
    if request.method == 'POST':
        serializer = ClaimSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        print('Request data: ', request.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)