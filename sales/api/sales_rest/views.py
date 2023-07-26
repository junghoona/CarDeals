from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import (
    AutomobileVO,
    Salesperson,
    Customer,
    Sale,
)

from .encoders import (
    AutomobileVOEncoder,
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_lst_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)

        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Salesperson does not exist"},
                status=400,
            )
    else:
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                {"message": "Salesperson deleted successfully"},
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Salesperson does not exist"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_lst_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)

        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


# TODO: Add Decorator tag ["DELETE", "GET", "PUT"]
@require_http_methods(["GET", "DELETE"])
def api_customer(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Customer does not exist"},
                status=400,
            )
    else:
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                {"message": "Customer deleted successfully"},
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Customer does not exist"},
                status=400,
            )


@require_http_methods(["GET", "POST"])
def api_lst_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            auto_id = content["automobile"]
            automobile = AutomobileVO.objects.get(id=auto_id)
            content["automobile"] = automobile

            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer

            sale = Sale.objects.create(**content)

            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Automobile VO does not exist"},
                status=400,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Salesperson does not exist"},
                status=400,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Customer does not exist"},
                status=400,
            )

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )


# TODO: Add Decorator tag ["DELTE", "GET", "PUT"]
@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Sale does not exist"},
                status=400,
            )
    else:
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                {"message": "Sale deleted successfully"},
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "ERROR: Sale does not exist"},
                status=400,
            )
