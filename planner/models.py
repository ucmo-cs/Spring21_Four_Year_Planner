from django.db import models

# Create your models here.
class Course(models.Model):
    course_id = models.CharField(max_length=10, primary_key=True)
    description = models.CharField(max_length=50)
    def __str__(self):
        return self.course_id

class Saved_Data(models.Model):
    course_id = models.CharField(max_length=10)
    position = models.IntegerField()
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

