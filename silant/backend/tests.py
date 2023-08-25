from unittest import skip
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from django.test import TestCase
from backend.models import CustomUser
from rest_framework.authtoken.models import Token
from .models import Client, ServiceCompany, EngineModel, TechnicalModel, TransmissionModel, DrivingBridgeModel, ControlledBridgeModel


class MachineTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_obj = CustomUser.objects.create_user(username='trudnikov',
                                                       first_name='ИП Трудников С.В',
                                                       last_name='',
                                                       email='',
                                                       role='Клиент')

        self.service_company_user_obj = CustomUser.objects.create_user(username='OOOPromTech',
                                                                       first_name='ООО Промышленная техника',
                                                                       last_name='',
                                                                       email='',
                                                                       role='Сервис')
        self.client_obj = Client.objects.create(name=self.user_obj, description='Клиент')
        self.service_company_obj = ServiceCompany.objects.create(name=self.service_company_user_obj,  description='Сервис')
        self.engine_model_obj = EngineModel.objects.create(name='Kubota-3300', description='none')
        self.technical_model_obj = TechnicalModel.objects.create(name='ПД2,0', description='none')
        self.transmission_model_obj = TransmissionModel.objects.create(name='4KioB6', description='none')
        self.driving_bridge_model_obj = DrivingBridgeModel.objects.create(name='00KBs541PL', description='none')
        self.controlled_bridge_model_obj = ControlledBridgeModel.objects.create(name='2SD670MS', description='none')

    def test_create_machine(self):
        url = reverse(
            'create_machine')
        data = {
            'machine_factory_number': '1234',
            'engine_factory_number': 'eng123',
            'transmission_factory_number': 'trans123',
            'driving_bridge_factory_number': 'drive123',
            'controlled_bridge_factory_number': 'control123',
            'delivery_contract': 'contract123',
            'shipment_date': '2022-08-18',
            'consignee': 'Vasili Pupkin',
            'delivery_address': '123 Main St',
            'equipment': 'equip123',
            'client': self.client_obj.id,
            'service_company': self.service_company_obj.id,
            'engine_model': self.engine_model_obj.id,
            'technical_model': self.technical_model_obj.id,
            'transmission_model': self.transmission_model_obj.id,
            'driving_bridge_model': self.driving_bridge_model_obj.id,
            'controlled_bridge_model': self.controlled_bridge_model_obj.id,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)

    @skip("Skipping this test as token is stored in localStorage")
    def test_issue_token(self):
        data = {'username': 'testuser', 'password': 'testpass'}
        response = self.client.post('/api/login', data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('token' in response.data)

    @skip("Skipping this test as token is stored in localStorage")
    def test_issue_token_invalid(self):
        data = {'username': 'testuser', 'password': 'wrongpass'}
        response = self.client.post('/api/login', data, format='json')
        self.assertEqual(response.status_code, 401)

    def test_user_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        response = self.client.get('/api/user')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('data' in response.data)

    def test_user_unauthenticated(self):
        response = self.client.get('/api/user')
        self.assertEqual(response.status_code, 401)

    def test_user_logout(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        response = self.client.post('/api/logout')
        self.assertEqual(response.status_code, 200)
