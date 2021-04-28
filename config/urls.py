from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

from django.urls import path
from planner import views
# from django.urls import path

from django.contrib import admin
from django.urls import path

from planner import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('planner/', include('planner.urls')),  # new
    path('planner/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='home.html'), name='home'),
    path('index', TemplateView.as_view(template_name='index.html',), name='index'),

    # returns all courses
    path('courses', views.course_list),

    # returns all courses with their prerequisites
    path('all_prerequisites', views.prerequisites),

    # returns semester id and title
    # we're assuming id is the placement on the screen
    # for example, "Fall 2021" has id 1, so it is placed in
    # the first div, and div 0 is the courses panel on the
    # left side of the screen (I'm open to other ideas)
    # -Andrew
    path('semesters', views.semester_list),

    # depeingind on type of request:
    # if get
    # returns the saved data positions
    # if put
    # updates positions of course ids
    path('saved_data', views.saved_data),


    # returns all course ids along with the semesters (ids) they are offered in
    path('offered_in', views.offered_in_list),

    # returns all prerequisites for a specific course
    # ex: localhost:8000/courses/prerequisites/CS1000
    path('courses/prerequisites/<slug:cid>', views.prerequisite_list),

    # search course ids and descriptions
    # matching the passed string
    # can match either the id or description
    # ex: http://localhost:8000/coursesearchOR/cs
    path('coursesearchOR/<slug:cid>', views.coursesearchOR),

    # search course ids and descriptions
    # matching the passed string
    # must match both id and description
    # ex: http://localhost:8000/coursesearchAND/cs
    path('coursesearchAND/<slug:cid>', views.coursesearchAND),

    # search course ids
    # matching the passed string
    # ex: http://localhost:8000/coursesearchID/cs
    path('coursesearchID/<slug:cid>', views.coursesearchID),

    # search course descirptions
    # matching the passed string
    # ex: http://localhost:8000/coursesearchDESC/cs
    path('coursesearchDESC/<slug:cid>', views.coursesearchDESC),

    # returns all courses offered in a specific semester
    # ex: localhost:8000/courses/offered_in/Spring2021
    path('courses/offered_in/<slug:cid>', views.offered_in_course),


    # return the current logged in user
    path('current_user', views.current_user),
]
