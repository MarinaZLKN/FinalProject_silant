import django_filters
from .models import Machine, Maintenance, Claim


class MachineFilter(django_filters.FilterSet):
    technical_model_name = django_filters.CharFilter(field_name="technical_model__name")
    engine_model_name = django_filters.CharFilter(field_name="engine_model__name")
    transmission_model_name = django_filters.CharFilter(field_name="transmission_model__name")
    controlled_bridge_model_name = django_filters.CharFilter(field_name="controlled_bridge_model__name")
    driving_bridge_model_name = django_filters.CharFilter(field_name="driving_bridge_model__name")

    class Meta:
        model = Machine
        fields = []


class MaintenanceFilter(django_filters.FilterSet):
    machine = django_filters.CharFilter(field_name="machine__machine_factory_number")
    organization = django_filters.CharFilter(field_name="organization__name")
    type_of_maintenance = django_filters.CharFilter(field_name="type_of_maintenance__name")

    class Meta:
        model = Maintenance
        fields = []


class ClaimFilter(django_filters.FilterSet):
    service_company = django_filters.CharFilter(field_name="service_company__name")
    failure_node = django_filters.CharFilter(field_name="failure_node__name")
    recovery_method = django_filters.CharFilter(field_name="recovery_method__name")

    class Meta:
        model = Claim
        fields = []

