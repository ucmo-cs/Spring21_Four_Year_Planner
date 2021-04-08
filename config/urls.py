from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from planner import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('planner/', include('planner.urls')),
    path('planner/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    # path('api-auth', include('rest_framework.urls')), # new
    path('index', TemplateView.as_view(template_name='index.html'), name='index'),  # new
    path('courses', views.course_list),
    path('prerequisite', views.prerequisite_list),
    path('semesters', views.semester_list),
    path('offered_in', views.offered_in_list),
    path('courses/offered_in/<slug:cid>', views.offered_in_course),
]
