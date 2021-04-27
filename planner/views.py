from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from planner.models import Course, Semester, Offered_In, Prerequisite
from planner.serializer import *


# from django.db import models

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'


def course_list(request):
    """
    List all courses.
    """
    if request.method == 'GET':
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)


def prerequisites(request):
    """
    List all prerequisites.
    """
    if request.method == 'GET':
        prerequisite = Prerequisite.objects.all()
        serializer = PrerequisiteSerializer(prerequisite, many=True)
        return JsonResponse(serializer.data, safe=False)
@csrf_exempt
def saved_data(request):
    """
    List all saved data.
    """
    if request.method == 'GET':
        saveddata = Saved_Data.objects.all()
        serializer = SavedDataSerializer(saveddata, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        name = request.user.username
        for obj in data:
            ucourse = Saved_Data.objects.get(course_id=obj["course_id"])
            unameSerializer = SavedDataSerializerUsername(ucourse, name)
            if unameSerializer.is_valid():
                unameSerializer.save()
            else:
                print("invalid") # remember postman does not send user information
        for obj in data: #assuming you are posting a 'list' of objects
            course = Saved_Data.objects.get(course_id=obj["course_id"])
            serializer = SavedDataSerializer(course, data=obj)
            if serializer.is_valid():
                serializer.save()
            else:
                return JsonResponse(data, safe=False, status=404)
        return JsonResponse(data, safe=False, status=200)

@csrf_exempt
def semester_list(request):
    """
    List all semesters.
    """
    if request.method == 'GET':
        semester = Semester.objects.all()
        serializer = SemesterSerializer(semester, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def offered_in_list(request):
    """
    List all pairs of course and semester offered
    """
    if request.method == 'GET':
        offered_ins = Offered_In.objects.all()

        serializer = Offered_InSerializer(offered_ins, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def offered_in_course(request, cid):
    """
    List the semesters a course is offered in.
    ex:)/courses/offered_in/CS3200
    """
    if request.method == 'GET':
        # Note the double underscore in the filter query parameter
        # says you want to look at the course_id sub-field of the
        # course field.
        offered_ins = Offered_In.objects.filter(course__course_id=cid)

        serializer = Offered_InTitlesSerializer(offered_ins, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def prerequisite_list(request, cid):
    """
    List all prerequisites of a specific course.
    ex:)/courses/prerequisite_list/CS3200
    """
    if request.method == 'GET':
        prereqs = Prerequisite.objects.filter(course__course_id=cid)
        serializer = PrerequisiteSerializer(prereqs, many=True)
        return JsonResponse(serializer.data, safe=False)

# @csrf_exempt
# def current_user(request):
#     """
#     Return current logged in user
#     """
#
#     current_user = request.user
#     print(current_user.username)
#
#     if request.method == 'GET':
#         offered_ins = Offered_In.objects.all()
#
#         serializer = Offered_InSerializer(offered_ins, many=True)
#         return JsonResponse()