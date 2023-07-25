# from django.shortcuts import render
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import Technician
from django.http import JsonResponse
import json


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":  # Handle "GET" request method
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:  # Handle "POST" request method
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )


@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    # Handle "DELETE" request method
    count, _ = Technician.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})
