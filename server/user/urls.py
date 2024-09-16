from django.urls import path
from user.views import loginView, registerView, CookieTokenRefreshView, logoutView, user

app_name = "user"

urlpatterns = [
    path('login', loginView,name='login'),
    path('register', registerView,name='register'),
    path('refresh-token', CookieTokenRefreshView.as_view()),
    path('logout', logoutView),
    path('user', user,name='user')
]
