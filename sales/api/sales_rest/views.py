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
        try:
            content = json.loads(request.body)
            print('CONTENT: ', content)
            return JsonResponse(
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse(
                {"message": "ERROR: Could not create the salesperson"}
            )
            response.status_code = 400
            return response


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
        try:
            content = json.loads(request.body)
            print('CONTENT: ', content)
            return JsonResponse(
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse(
                {"message": "ERROR: Customer does not exist"}
            )
            response.status_code = 404
            return response


# TODO: Add Decorator tag ["DELTE", "GET", "PUT"]
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
            return JsonResponse(
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse(
                {"message": "ERROR: Sale Does Not Exist"}
            )
            response.status_code = 404
            return response


# TODO: Add Decorator tag ["DELTE", "GET", "PUT"]
def api_sale(request, id):
    sale = Sale.objects.get(id=id)
    return JsonResponse(
        sale,
        encoder=SaleEncoder,
        safe=False,
    )
