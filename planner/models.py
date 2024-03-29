from django.db import models
from django.contrib.auth.models import User
from .utils import create_new_ref_number

# Create your models here.
class Course(models.Model):
    course_id = models.CharField(max_length=10, primary_key=True)
    description = models.CharField(max_length=50)
    def __str__(self):
        return self.course_id

# class Saved_Data(models.Model):
#     course_id = models.CharField(max_length=10)
#     position = models.IntegerField()
#     user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, default=True, primary_key=True)
#     def __str__(self):
#         return self.course_id




class Saved_Data(models.Model):
    course_id = models.CharField(max_length=10)
    position = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,default=True)
    id = models.IntegerField(primary_key=True, default=create_new_ref_number(), editable=False)

    class Meta:
        unique_together = (("course_id", "user"),)

    def __str__(self):
        return self.course_id
    #label divs as '1, 2, 3, 4'... so 1 is a course saved in
    #the available courses div, and 2 is the first semester, and so on

class Semester(models.Model):
    semester_id = models.CharField(max_length=10, primary_key=True)
    title = models.CharField(max_length=10)
    def __str__(self):
        return self.title

class Offered_In(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    def __str__(self):
        return self.course.course_id
    # semester_id = models.CharField(max_length=10)

class Prerequisite(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='+')
    prereq = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='+')
    def __str__(self):
        return self.course.course_id#, self.prereq

class CurrentUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, default=True, primary_key=True)
    def __str__(self):
        return self.user