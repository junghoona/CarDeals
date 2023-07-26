from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("", kwargs={"id": self.id})


# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=25)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("", kwargs={"id": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("", kwargs={"id": self.id})


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )
    price = models.DecimalField(max_digits=20, decimal_places=2)
