from functools import wraps
import django_filters
from django.http import HttpResponseForbidden
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
from django.shortcuts import render
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

        # Checking if authenticate returned a valid user
        if authenticated_user is None:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=authenticated_user)
        return Response(TokenSeriazliser(token).data)

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
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    ordering_fields = ["-shipment_date"]
    ordering = ["-shipment_date"]


class MaintenanceViewset(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    ordering_fields = ['-date_of_maintenance']
    ordering = ['-date_of_maintenance']


class ClaimViewset(viewsets.ModelViewSet):
    queryset = Claim.objects.all()
    serializer_class = ClaimSerializer
    ordering_fields = ['-date_of_failure']
    ordering = ['-date_of_failure']


# Machine instance detail view
@api_view(['GET'])
def machine_detail(request, machine_id):
    try:
        machine = Machine.objects.get(id=machine_id)
        serializer = MachineSerializer(machine)
        return Response(serializer.data)
    except Machine.DoesNotExist:
        return Response({'detail': 'Machine not found'}, status=404)


# Claim instance detail view
@api_view(['GET'])
def claim_detail(request, claim_id):
    try:
        claim = Claim.objects.get(id=claim_id)
        serializer = ClaimSerializer(claim)
        return Response(serializer.data)
    except Claim.DoesNotExist:
        return Response({'detail': 'Claim not found'}, status=404)


# Maintenance instance detail view
@api_view(['GET'])
def maintenance_detail(request, maintenance_id):
    try:
        maintenance = Maintenance.objects.get(id=maintenance_id)
        serializer = MaintenanceSerializer(maintenance)
        return Response(serializer.data)
    except Maintenance.DoesNotExist:
        return Response({'detail': 'Maintenance not found'}, status=404)


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


def group_required(*group_names):
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            print("Пользователь:", request.user)
            print("Группы пользователя:", request.user.groups.all())
            print("Требуемые группы:", group_names)
            if request.user.groups.filter(name__in=group_names).exists():
                return view_func(request, *args, **kwargs)
            return HttpResponseForbidden()
        return _wrapped_view
    return decorator


# Machine instance creation
@group_required('Manager')
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