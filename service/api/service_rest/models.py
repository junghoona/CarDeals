from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=200)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.CharField(max_length=3)


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=200, default="pending")
    vin = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk": self.id})
