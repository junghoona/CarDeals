from django.db import models
from inventory.api.inventory_rest.models import Automobile


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    sold = models.BooleanField(default=False)


# Create your models here.
class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(unique=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=100)


class Sale(models.Model):
    automobile = models.ForeignKey(
        Automobile,
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
    price = models.DecimalField(max_digits=None, decimal_places=2)

    def __str__(self):
        return f"{self.automobile} - {self.price}"

    class Meta:
        ordering = ("automobile", "price") 
