from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class CustomUser(AbstractUser):
    CLIENT = 'Клиент'
    SERVICE = 'Сервис'
    MANAGER = 'Менеджер'
    ADMIN = 'Админ'

    CHOICES = [
        (CLIENT, 'Клиент'),
        (SERVICE, 'Сервисная организация'),
        (MANAGER, 'Менеджер'),
        (ADMIN, 'Админ'),
    ]

    role = models.CharField('Роль пользователя', max_length=10, choices=CHOICES, default='Админ')

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = self.ADMIN
        super(CustomUser, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.first_name}'


class Client(models.Model):
    name = models.ForeignKey(CustomUser, verbose_name='Клиент', on_delete=models.CASCADE)
    description = models.TextField('Описание', max_length=500, null=True, blank=True)

    def __str__(self):
        return f'{self.name}'


class ServiceCompany(models.Model):
    name = models.ForeignKey(CustomUser, verbose_name='Сервисная компания',
                             on_delete=models.CASCADE)
    description = models.TextField('Описание', max_length=500, null=True, blank=True)

    def __str__(self):
        return f'{self.name}'


class TechnicalModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class TransmissionModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class EngineModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class ControlledBridgeModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class DrivingBridgeModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class TypeOfMaintenance(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Organization(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class FailureNode(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class Machine(models.Model):
    machine_factory_number = models.CharField(max_length=4)
    engine_factory_number = models.CharField(max_length=100)
    transmission_factory_number = models.CharField(max_length=100)
    driving_bridge_factory_number = models.CharField(max_length=100)
    controlled_bridge_factory_number = models.CharField(max_length=100)
    delivery_contract = models.CharField(max_length=100)
    shipment_date = models.DateField()
    consignee = models.CharField(max_length=100)
    delivery_address = models.CharField(max_length=100)
    equipment = models.CharField(max_length=100)

    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank=True, null=True)  # покупатель
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, blank=True, null=True)
    engine_model = models.ForeignKey(EngineModel, on_delete=models.CASCADE, blank=True, null=True)
    technical_model = models.ForeignKey(TechnicalModel, on_delete=models.CASCADE, blank=True, null=True)
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE, blank=True, null=True)
    driving_bridge_model = models.ForeignKey(DrivingBridgeModel, on_delete=models.CASCADE, blank=True, null=True)
    controlled_bridge_model = models.ForeignKey(ControlledBridgeModel, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.machine_factory_number


# ТО
class Maintenance(models.Model):
    date_of_maintenance = models.DateField()
    operating_time = models.IntegerField()
    order_number = models.CharField(max_length=100)
    data_of_order = models.DateField()

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    type_of_maintenance = models.ForeignKey(TypeOfMaintenance, on_delete=models.CASCADE)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)


class Claim(models.Model):
    date_of_failure = models.DateField()
    operating_time = models.IntegerField()
    spare_parts_used = models.TextField(null=True, blank=True, default=None)
    date_of_recovery = models.DateField()
    technical_downtime = models.IntegerField(null=True)
    description_of_failure = models.CharField(max_length=100)

    failure_node = models.ForeignKey(FailureNode, on_delete=models.CASCADE)
    recovery_method = models.ForeignKey(RecoveryMethod, on_delete=models.CASCADE)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE, null=True)

    # по сути, дата восстановления - дата отказа
    def calculate_technical_downtime(self):
        self.technical_downtime = (self.date_of_recovery - self.date_of_failure).days
        self.save()

    def __str__(self):
        return f"Claim #{self.id}"


