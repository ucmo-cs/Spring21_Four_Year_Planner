from django.contrib import admin

# Register your models here.
from .models import Course, Saved_Data, Semester, Offered_In, Prerequisite

admin.site.register(Course)

admin.site.register(Saved_Data)

admin.site.register(Semester)

admin.site.register(Offered_In)

admin.site.register(Prerequisite)