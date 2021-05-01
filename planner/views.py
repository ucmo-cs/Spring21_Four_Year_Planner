from django.db.models import Q
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from django.http import  HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from planner.serializer import *

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
def coursesearchOR(request, cid):
    if request.method == 'GET':
        courses = Course.objects.filter(Q(course_id__contains=cid) | Q(description__contains=cid))
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def coursesearchAND(request, cid):
    if request.method == 'GET':
        courses = Course.objects.filter(Q(course_id__contains=cid) & Q(description__contains=cid))
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def coursesearchID(request, cid):
    if request.method == 'GET':
        courses = Course.objects.filter(course_id__contains=cid)
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def coursesearchDESC(request, cid):
    if request.method == 'GET':
        courses = Course.objects.filter(description__contains=cid)
        serializer = CourseSerializer(courses, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def saved_data(request):
    """
    List all saved data for the current logged in user.
    """
    if request.method == 'GET':
        name = request.user.username
        saveddata = Saved_Data.objects.filter(user__username=name)
        serializer = SavedDataSerializer(saveddata, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        name = request.user.username
        for obj in data:
            course = Saved_Data.objects.get(course_id=obj["course_id"], user__username=name)
            # position = Saved_Data.objects.get(position=obj["position"])
            serializer = SavedDataSerializer(course, data=obj)
            if serializer.is_valid():
                serializer.save()
            else:
                print("invalid")
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

@csrf_exempt
def current_user(request):
    """
    Return current logged in user
    """
    if request.method == 'GET':
        print(request.user.username)
        x = str(request.user.username)
        return JsonResponse(x, safe=False)