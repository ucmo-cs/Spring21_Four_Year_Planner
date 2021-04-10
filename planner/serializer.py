from rest_framework import serializers
from .models import *


class CourseSerializer(serializers.ModelSerializer):
    # This serializes a list of Course objects, with all fields
    class Meta:
        model = Course
        fields = ['course_id', 'description']


class SemesterSerializer(serializers.ModelSerializer):
    # This serializes a list of Semester objects, with all fields
    class Meta:
        model = Semester
        fields = ['semester_id', 'title']


class SemesterTitleSerializer(serializers.ModelSerializer):
    # This serializes a list of Semester objects, with only the
    # title field.
    class Meta:
        model = Semester
        fields = ['title']


class Offered_InSerializer(serializers.ModelSerializer):
    # This serializes a list of Offered_In objects, and uses
    # the Serializers for Course and Semester to serialize the
    # Foreign Key fiels for them.
    course = CourseSerializer(read_only=True)
    semester = SemesterSerializer(read_only=True)

    class Meta:
        model = Offered_In
        fields = ['course', 'semester']


class Offered_InTitlesSerializer(serializers.ModelSerializer):
    # This serializes a list of Offered_In objects, and uses
    # the Serializer for Semester to just serialize the
    # Titles
    semester = SemesterTitleSerializer(read_only=True)

    class Meta:
        model = Offered_In
        fields = ['semester']

class PrerequisiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prerequisite
        fields = ['course', 'prereq']

class PrerequisiteTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prerequisite
        fields = ['course']

class SavedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Saved_Data
        fields = ['course_id', 'position']