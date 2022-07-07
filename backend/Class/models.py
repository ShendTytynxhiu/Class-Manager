from django.db import models
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class Class(models.Model):
    teacher     =   models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    students    =   models.ManyToManyField(CustomUser, related_name="classes_set")

    subject     =   models.CharField(max_length=128)
    max_points  =   models.IntegerField()
    min_points  =   models.IntegerField()

    start_date  =   models.DateField()
    end_date    =   models.DateField()

    def __str__(self):
        return self.subject


class Chat(models.Model):
	content     =   models.CharField(max_length=1000)
	timestamp   =   models.DateTimeField(auto_now=True)

	user        =   models.ForeignKey(CustomUser, on_delete=models.CASCADE)
	room        =   models.ForeignKey(Class, on_delete=models.CASCADE)


class Test(models.Model):
    title       =   models.CharField(max_length=128)
    _class      =   models.ForeignKey(Class, on_delete=models.CASCADE)
    guide_lines =   models.FileField(upload_to="guidelines/")

    is_finished =   models.BooleanField(default=False)
    due_date    =   models.DateTimeField()


class WorkSheet(models.Model):
    test        =   models.ForeignKey(Test, on_delete=models.CASCADE)
    file        =   models.FileField(upload_to='documents/')

    student     =   models.OneToOneField(CustomUser, on_delete=models.CASCADE)


class Grade(models.Model):
    worksheet   =   models.ForeignKey(WorkSheet, on_delete=models.CASCADE)
    points      =   models.IntegerField()


"""
grade.worksheet

worksheet.grade_set
"""