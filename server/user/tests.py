from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.conf import settings
from unittest.mock import patch
User = get_user_model()  # Use this to refer to the User model

class UserTests(APITestCase):

    def setUp(self):
        # Create a user for login tests
        self.user = User.objects.create_user(email='test@example.com', password='password123')

    def test_login_view(self):
        url = reverse('user:login')
        data = {'email': 'test@example.com', 'password': 'password123'}

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.data)
        self.assertIn('refresh_token', response.data)
        self.assertIn('X-CSRFToken', response)
        self.assertIn(settings.SIMPLE_JWT['AUTH_COOKIE'], response.cookies)
        self.assertIn(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'], response.cookies)



class UserRegistrationTests(APITestCase):

    def setUp(self):
        self.url = reverse('user:register')

    def test_valid_registration(self):
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'password': 'password123',
            'password2': 'password123',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'john.doe@example.com')

    def test_password_mismatch(self):
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john.doe@example.com',
            'password': 'password123',
            'password2': 'differentpassword',
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)
        self.assertEqual(User.objects.count(), 0)


class UserDetailTests(APITestCase):

    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(
            email='test@example.com',
            password='password123',
            ethereum_wallet_address='0x123'
        )
        # Obtain JWT token
        self.token = self.get_jwt_token(self.user)
        self.url = reverse('user:user')  # Ensure this matches your actual URL pattern

    def get_jwt_token(self, user):
        # Use the JWT authentication endpoint to get a token
        response = self.client.post(reverse('user:login'), {
            'email': user.email,
            'password': 'password123'
        }, format='json')
        # import pdb;pdb.set_trace()
        return response.data['access_token']

    @patch('user.utils.get_wallet_balance')
    def test_user_detail_success(self, mock_get_wallet_balance):
        # Mock the wallet balance
        mock_get_wallet_balance.return_value = 100.00

        # Set the Authorization header with the JWT token
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertIn('balance', response.data)
        self.assertEqual(response.data['balance'], "Invalid wallet address")

    def test_user_not_authenticated(self):
        self.client.credentials()  # Clear any credentials
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
