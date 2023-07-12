from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from django.contrib import messages
from allauth.account.views import SignupView
from .forms import CustomSignupForm
from rest_framework import generics
from .serializers import UserSerializer
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm


def register_user(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('/')
    else:
        form = UserRegistrationForm()

    return render(request, 'accounts/register.html', {'form': form})


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


class TechnicalModelViewset(viewsets.ModelViewSet):
    queryset = TechnicalModel.objects.all()
    serializer_class = TechnicalModelSerializer


class TransmissionModelViewset(viewsets.ModelViewSet):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer


class EngineModelViewset(viewsets.ModelViewSet):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer


class DrivingBridgeModelViewset(viewsets.ModelViewSet):
    queryset = DrivingBridgeModel.objects.all()
    serializer_class = DrivingBridgeModelSerializer


class ControlledBridgeModelViewset(viewsets.ModelViewSet):
    queryset = ControlledBridgeModel.objects.all()
    serializer_class = ControlledBridgeModelSerializer


class TypeOfMaintenanceViewset(viewsets.ModelViewSet):
    queryset = TypeOfMaintenance.objects.all()
    serializer_class = TypeOfMaintenanceSerializer


class RecoveryMethodViewset(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer


class ClientViewset(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class OrganizationViewset(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class FailureNodeViewset(viewsets.ModelViewSet):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer


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
