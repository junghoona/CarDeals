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


# TODO: Add Decorator tag ["DELTE", "GET", "PUT"]
def api_salesperson(request, employee_id):
    salesperson = Salesperson.objects.get(employee_id=employee_id)
    return JsonResponse(
        salesperson,
        encoder=SalespersonEncoder,
        safe=False,
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
def api_customer(request, id):
    customer = Customer.objects.get(id=id)
    return JsonResponse(
        customer,
        encoder=CustomerEncoder,
        safe=False,
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
            print('CONTENT: ', content)

            vin = content["automobile"]

            print('VIN: ', vin)
            automobile = AutomobileVO.objects.get(id=vin)
            content["automobile"] = automobile

            salesperson_id = content["salesperson"]

            print('SALESPERSON_ID: ', salesperson_id)
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson

            customer_id = content["customer"]

            print('CUSTOMER_ID: ', customer_id)
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
def api_sale(request, id):
    sale = Sale.objects.get(id=id)
    return JsonResponse(
        sale,
        encoder=SaleEncoder,
        safe=False,
    )
