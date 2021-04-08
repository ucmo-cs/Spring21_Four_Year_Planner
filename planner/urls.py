from django.urls import path

from .views import SignUpView
from planner import views
# from django.urls import path

from django.contrib import admin
from django.urls import path

from planner import views


urlpatterns = [
    # path('signup/', SignUpView.as_view(), name='signup'),
]
